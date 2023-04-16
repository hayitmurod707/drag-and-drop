import { number, string } from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
const StyledElement = styled.div`
   align-items: center;
   background-color: #ffffff;
   border-radius: 10px;
   border: 1px solid lightgrey;
   display: flex;
   font-size: 14px;
   font-weight: 700;
   margin: 8px;
   padding: 8px 12px;
   width: calc(100% - 42px);
   &[data-dragging='true'] {
      background-color: lightgreen;
   }
   & .handle {
      align-items: center;
      background-color: transparent;
      border: none;
      display: flex;
      height: 24px;
      justify-content: center;
      margin-right: 10px;
      outline: none;
      width: 24px;
      & svg {
         min-height: 24px;
         min-width: 24px;
      }
   }
   & .section-child-name {
      display: inline-block;
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
const SectionChild = ({ sectionIndex, index, name }) => (
   <Draggable draggableId={`${sectionIndex}-${index}`} index={index}>
      {({ innerRef, draggableProps, dragHandleProps }, { isDragging }) => (
         <StyledElement
            {...draggableProps}
            {...dragHandleProps}
            data-dragging={isDragging}
            id={`${sectionIndex}-${index}`}
            ref={innerRef}
         >
            <div className='handle'>
               <HandleIcon />
            </div>
            <div className='section-child-name'>{name}</div>
         </StyledElement>
      )}
   </Draggable>
);
SectionChild.defaultProps = {
   index: 0,
   name: '',
   sectionIndex: 0,
};
SectionChild.propTypes = {
   index: number.isRequired,
   name: string,
   sectionIndex: number.isRequired,
};
export default SectionChild;
