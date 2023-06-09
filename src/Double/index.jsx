import { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Section from './Section';
const StyledElement = styled.div`
   align-items: center;
   display: flex;
   flex-direction: column;
   & .sections {
      background-color: white;
      border-radius: 10px;
      padding: 8px 8px 0 8px;
      transition: 400ms;
      width: 350px;
      &[data-dragging-over='true'] {
         background-color: skyblue;
      }
   }
`;
const Double = () => {
   const [sections, setSections] = useState([
      {
         name: 'Section 1',
         children: [
            {
               name: 'Section child 1 1',
            },
            {
               name: 'Section child 1 2',
            },
         ],
      },
      {
         name: 'Section 2',
         children: [
            {
               name: 'Section child 2 1',
            },
            {
               name: 'Section child 2 2',
            },
         ],
      },
      {
         name: 'Section 3',
         children: [
            {
               name: 'Section child 3 1',
            },
            {
               name: 'Section child 3 2',
            },
         ],
      },
   ]);
   const checkArray = array => (Array.isArray(array) ? array : []);
   const checkedSections = checkArray(sections);
   const onDragEnd = params => {
      const source = params?.source;
      const destination = params?.destination;
      const type = params?.type;
      const sourceIndex = source?.index;
      const sourceId = parseInt(source?.droppableId);
      const destinationIndex = destination?.index;
      const destinationId = parseInt(destination?.droppableId);
      if (
         !destination ||
         (destinationIndex === sourceIndex && destinationId === sourceId)
      ) {
         return;
      } else {
         let sections = checkedSections;
         if (type === 'section') {
            const currentSection = checkedSections[sourceIndex];
            sections =
               sourceIndex > destinationIndex
                  ? [
                       ...checkedSections.slice(0, destinationIndex),
                       currentSection,
                       ...checkedSections.slice(destinationIndex, sourceIndex),
                       ...checkedSections.slice(sourceIndex + 1),
                    ]
                  : [
                       ...checkedSections.slice(0, sourceIndex),
                       ...checkedSections.slice(
                          sourceIndex + 1,
                          destinationIndex + 1
                       ),
                       currentSection,
                       ...checkedSections.slice(destinationIndex + 1),
                    ];
         } else {
            const destinationSectionChildren = checkArray(
               checkedSections[destinationId]?.children
            );
            const sourceSectionChildren = checkArray(
               checkedSections[sourceId]?.children
            );
            const currentSubSection = sourceSectionChildren[sourceIndex];
            const sourceChildren = sourceSectionChildren.filter(
               (section, index) => index !== sourceIndex
            );
            const destinationChildren =
               destinationId === sourceId
                  ? sourceIndex > destinationIndex
                     ? [
                          ...destinationSectionChildren.slice(
                             0,
                             destinationIndex
                          ),
                          currentSubSection,
                          ...destinationSectionChildren.slice(
                             destinationIndex,
                             sourceIndex
                          ),
                          ...destinationSectionChildren.slice(sourceIndex + 1),
                       ]
                     : [
                          ...destinationSectionChildren.slice(0, sourceIndex),
                          ...destinationSectionChildren.slice(
                             sourceIndex + 1,
                             destinationIndex + 1
                          ),
                          currentSubSection,
                          ...destinationSectionChildren.slice(
                             destinationIndex + 1
                          ),
                       ]
                  : [
                       ...destinationSectionChildren.slice(0, destinationIndex),
                       currentSubSection,
                       ...destinationSectionChildren.slice(destinationIndex),
                    ];
            sections = checkedSections.map((section, index) => {
               if (index === destinationId) {
                  return { ...section, children: destinationChildren };
               } else if (index === sourceId) {
                  return { ...section, children: sourceChildren };
               } else {
                  return section;
               }
            });
         }
         setSections(sections);
      }
   };
   return (
      <StyledElement>
         <DragDropContext onDragEnd={onDragEnd}>
            <Droppable
               direction='vertical'
               droppableId='section'
               type='section'
            >
               {(
                  { innerRef, droppableProps, placeholder },
                  { isDraggingOver }
               ) => (
                  <div
                     {...droppableProps}
                     className='sections'
                     data-dragging-over={isDraggingOver}
                     ref={innerRef}
                  >
                     {checkedSections.map((section, index) => (
                        <Section
                           {...section}
                           key={index}
                           sectionIndex={index}
                        />
                     ))}
                     {placeholder}
                  </div>
               )}
            </Droppable>
         </DragDropContext>
      </StyledElement>
   );
};
export default Double;
