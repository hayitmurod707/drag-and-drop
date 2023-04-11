import styled from 'styled-components';
export const StyledElement = styled.div`
   align-items: center;
   display: flex;
   flex-direction: column;
   & .view-sections-button {
      background-color: #5254f1;
      border-radius: 10px;
      border: none;
      color: #ffffff;
      cursor: pointer;
      font-size: 16px;
      font-weight: 500;
      height: 40px;
      margin: 0 0 20px 0;
      padding: 0 20px;
   }
   & .list {
      background-color: white;
      border-radius: 10px;
      padding: 8px 8px 0 8px;
      transition: 400ms;
      width: 320px;
      &[data-dragging-over='dragging-over'] {
         background-color: skyblue;
      }
   }
`;
