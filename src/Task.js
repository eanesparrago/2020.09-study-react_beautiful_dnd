import React, { Component } from "react";
import styled, { css } from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  transition: background-color 150ms;
  background-color: ${(p) =>
    p.isDragDisabled ? "lightgrey" : p.isDragging ? "lightgreen" : "white"};
  display: flex;
`;

const Handle = styled.div`
  width: 20px;
  height: 20px;
  background-color: orange;
  border-radius: 4px;
  margin-right: 8px;
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
            {/* <Handle {...provided.dragHandleProps}></Handle> */}
            {this.props.task.content}
          </Container>
        )}
      </Draggable>
    );
  }
}

export default Task;
