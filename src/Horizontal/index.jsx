import { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Section from './Section';
export const StyledElement = styled.div`
   display: flex;
   justify-content: center;
   & .sections {
      background-color: white;
      border-radius: 12px;
      display: flex;
      padding: 8px 8px 8px 0;
      transition: 400ms;
      &[data-dragging-over='true'] {
         background-color: skyblue;
      }
   }
`;
const Horizontal = () => {
   const [sections, setSections] = useState([
      {
         name: 'Section 1',
      },
      {
         name: 'Section 2',
      },
      {
         name: 'Section 3',
      },
      {
         name: 'Section 4',
      },
      {
         name: 'Section 5',
      },
   ]);
   const checkedSections = Array.isArray(sections) ? sections : [];
   const onDragEnd = params => {
      const destination = params?.destination;
      const sourceIndex = params?.source?.index;
      const destinationIndex = destination?.index;
      if (destination) {
         const currentSection = checkedSections[sourceIndex];
         const sections =
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
         setSections(sections);
      }
   };
   return (
      <StyledElement>
         <DragDropContext onDragEnd={onDragEnd}>
            <Droppable direction='horizontal' droppableId='droppable'>
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
export default Horizontal;
