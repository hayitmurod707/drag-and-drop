import { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Section from './Section';
export const StyledElement = styled.div`
   align-items: center;
   display: flex;
   flex-direction: column;
   & .sections {
      background-color: white;
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      padding: 8px 8px 0 8px;
      transition: 400ms;
      width: 320px;
      &[data-dragging-over='true'] {
         background-color: skyblue;
      }
   }
`;
const Single = () => {
   const [sections, setSections] = useState([
      {
         order: 1,
         name: 'section-1',
      },
      {
         order: 2,
         name: 'section-2',
      },
      {
         order: 3,
         name: 'section-3',
      },
      {
         order: 4,
         name: 'section-4',
      },
      {
         order: 5,
         name: 'section-5',
      },
   ]);
   const checkedSections = Array.isArray(sections) ? sections : [];
   const onDragEnd = params => {
      const destination = params?.destination;
      const sourceIndex = params?.source?.index;
      const destinationIndex = destination?.index;
      if (destination) {
         const currentSection = checkedSections[sourceIndex];
         const newSections =
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
         setSections(newSections);
      }
   };
   return (
      <StyledElement>
         <DragDropContext onDragEnd={onDragEnd}>
            <Droppable direction='vertical' droppableId='droppable'>
               {(
                  { innerRef, placeholder, droppableProps },
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
                           index={index}
                           isDraggingOver={isDraggingOver}
                           key={index}
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
export default Single;
