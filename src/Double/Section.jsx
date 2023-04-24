import { array, number, string } from 'prop-types';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import SectionChild from './SectionChild';
const StyledElement = styled.div`
   background-color: #ffffff;
   border-radius: 12px;
   border: 1px solid lightgrey;
   display: flex;
   flex-direction: column;
   margin: 0 0 8px 0;
   &[data-dragging='true'] {
      background-color: lightgreen;
      border: 1px solid lightgreen;
   }
   & .section {
      align-items: center;
      display: flex;
      font-size: 16px;
      font-weight: 700;
      height: 28px;
      padding: 8px 12px;
      &[data-has-children='true'] {
         border-bottom: 1px solid lightgrey;
      }
      & .handle {
         height: 24px;
         margin-right: 10px;
         width: 24px;
      }
      & .name {
         display: inline-block;
      }
   }
   & .section-children {
      background-color: transparent;
      transition: 400ms;
      border-radius: 0 0 9px 9px;
      &[data-dragging-over='true'] {
         background-color: skyblue;
      }
   }
`;
const HandleIcon = () => (
   <svg fill='none' height='24' viewBox='0 0 16 16' width='24'>
      <g>
         <path
            d='M2.00001 5.33333H14C14.1768 5.33333 14.3464 5.2631 14.4714 5.13807C14.5964 5.01305 14.6667 4.84348 14.6667 4.66667C14.6667 4.48986 14.5964 4.32029 14.4714 4.19526C14.3464 4.07024 14.1768 4 14 4H2.00001C1.8232 4 1.65363 4.07024 1.52861 4.19526C1.40358 4.32029 1.33334 4.48986 1.33334 4.66667C1.33334 4.84348 1.40358 5.01305 1.52861 5.13807C1.65363 5.2631 1.8232 5.33333 2.00001 5.33333ZM14 10.6667H2.00001C1.8232 10.6667 1.65363 10.7369 1.52861 10.8619C1.40358 10.987 1.33334 11.1565 1.33334 11.3333C1.33334 11.5101 1.40358 11.6797 1.52861 11.8047C1.65363 11.9298 1.8232 12 2.00001 12H14C14.1768 12 14.3464 11.9298 14.4714 11.8047C14.5964 11.6797 14.6667 11.5101 14.6667 11.3333C14.6667 11.1565 14.5964 10.987 14.4714 10.8619C14.3464 10.7369 14.1768 10.6667 14 10.6667ZM14 7.33333H2.00001C1.8232 7.33333 1.65363 7.40357 1.52861 7.5286C1.40358 7.65362 1.33334 7.82319 1.33334 8C1.33334 8.17681 1.40358 8.34638 1.52861 8.4714C1.65363 8.59643 1.8232 8.66667 2.00001 8.66667H14C14.1768 8.66667 14.3464 8.59643 14.4714 8.4714C14.5964 8.34638 14.6667 8.17681 14.6667 8C14.6667 7.82319 14.5964 7.65362 14.4714 7.5286C14.3464 7.40357 14.1768 7.33333 14 7.33333Z'
            fill='#5254f1'
         />
      </g>
   </svg>
);
const Section = ({ sectionIndex, name, children }) => (
   <Draggable draggableId={`column-${sectionIndex}`} index={sectionIndex}>
      {({ innerRef, draggableProps, dragHandleProps }, { isDragging }) => (
         <StyledElement
            {...draggableProps}
            data-dragging={isDragging}
            ref={innerRef}
         >
            <div className='section' data-has-children={children?.length > 0}>
               <div className='handle' {...dragHandleProps}>
                  <HandleIcon />
               </div>
               <div className='name'>{name}</div>
            </div>
            <Droppable
               direction='vertical'
               droppableId={`${sectionIndex}`}
               type='section-child'
            >
               {(
                  { innerRef, droppableProps, placeholder },
                  { isDraggingOver }
               ) => (
                  <div
                     {...droppableProps}
                     className='section-children'
                     data-dragging-over={isDraggingOver}
                     ref={innerRef}
                  >
                     {(Array.isArray(children) ? children : []).map(
                        (child, index) => (
                           <SectionChild
                              {...child}
                              index={index}
                              key={index}
                              sectionIndex={sectionIndex}
                           />
                        )
                     )}
                     {placeholder}
                  </div>
               )}
            </Droppable>
         </StyledElement>
      )}
   </Draggable>
);
Section.defaultProps = {
   children: [],
   name: '',
   sectionIndex: 0,
};
Section.propTypes = {
   children: array,
   name: string,
   sectionIndex: number.isRequired,
};
export default Section;
