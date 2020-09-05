import React, { Component } from "react";
import styled, { css } from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 50%;
  padding: 8px;
  margin-right: 8px;
  transition: background-color 150ms;
  background-color: ${(p) =>
    p.isDragDisabled ? "lightgrey" : p.isDragging ? "lightgreen" : "white"};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;

  &:focus {
    outline: none;
    border-color: red;
  }
`;

export class Task extends Component {
  render() {
    const isDragDisabled = this.props.task.id === "task-1";

    return (
      <Draggable
        draggableId={this.props.task.id}
        index={this.props.index}
        isDragDisabled={isDragDisabled}
      >
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
            isDragDisabled={isDragDisabled}
          >
            {this.props.task.content[0]}
          </Container>
        )}
      </Draggable>
    );
  }
}

export default Task;
