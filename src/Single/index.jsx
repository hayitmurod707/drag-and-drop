import { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Section from './Section';
import { StyledElement } from './StyledElements';
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
      {
         order: 6,
         name: 'section-6',
      },
      {
         order: 7,
         name: 'section-7',
      },
      {
         order: 8,
         name: 'section-8',
      },
      {
         order: 9,
         name: 'section-9',
      },
      {
         order: 10,
         name: 'section-10',
      },
   ]);
   const onDragEnd = ({ destination, source }) => {
      if (destination) {
         const { index: startIndex } = source;
         const { index: endIndex } = destination;
         const currentSection = sections[startIndex];
         const list =
            startIndex > endIndex
               ? [
                    ...sections?.slice(0, endIndex),
                    currentSection,
                    ...sections?.slice(endIndex, startIndex),
                    ...sections?.slice(startIndex + 1),
                 ]
               : [
                    ...sections?.slice(0, startIndex),
                    ...sections?.slice(startIndex + 1, endIndex + 1),
                    currentSection,
                    ...sections?.slice(endIndex + 1),
                 ];
         setSections(list);
      } else {
         return;
      }
   };
   const parseOrder = () => {
      const newList = sections?.map((section, index) => ({
         ...section,
         order: index + 1,
      }));
      console.log(newList);
   };
   return (
      <StyledElement>
         <button className='view-sections-button' onClick={parseOrder}>
            View sections
         </button>
         <DragDropContext onDragEnd={onDragEnd}>
            <Droppable direction='vertical' droppableId='droppable'>
               {(
                  { innerRef, placeholder, droppableProps },
                  { isDraggingOver }
               ) => (
                  <div
                     {...droppableProps}
                     className='list'
                     data-dragging-over={isDraggingOver ? 'dragging-over' : ''}
                     ref={innerRef}
                  >
                     {(Array.isArray(sections) ? sections : []).map(
                        (section, index) => (
                           <Section {...section} key={index} index={index} />
                        )
                     )}
                     {placeholder}
                  </div>
               )}
            </Droppable>
         </DragDropContext>
      </StyledElement>
   );
};
export default Single;
