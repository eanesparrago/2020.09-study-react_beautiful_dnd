import React, { Component } from "react";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";

import Task from "./Task";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;

  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  padding: 8px;
`;

const TaskList = styled.div`
  padding: 8px;
  transition: background-color 150ms;
  background-color: ${(p) => (p.isDraggingOver ? "skyblue " : "white")};
  display: flex;
`;

export class Column extends Component {
  render() {
    return (
      <Container>
        <Title>{this.props.column.title}</Title>

        <Droppable
          droppableId={this.props.column.id}
          direction="horizontal"
          // type={this.props.column.id === "column-3" ? "done" : "active"}
          isDropDisabled={this.props.isDropDisabled}
        >
          {(provided, snapshot) => (
            <TaskList
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {this.props.tasks.map((task, index) => (
                <Task key={task.id} index={index} task={task}></Task>
              ))}

              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
      </Container>
    );
  }
}

export default Column;
