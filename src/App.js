import React, { Component } from "react";
import { DragDropContext } from "react-beautiful-dnd";

import Column from "./Column";
import initialData from "./initial-data";

export class App extends Component {
  state = initialData;

  onDragEnd = (result) => {
    /*
    result
    {
      draggableId: "task-1",
      type: "TYPE",
      reason: "DROP",
      source: {
        droppableId: "column-1",
        index: 0
      },
      destination: {
        droppableId: "column-1",
        index: 1
      }
    }
    */

    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const column = this.state.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);

    // Sorting algorithm
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
      taskIds: newTaskIds,
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newColumn.id]: newColumn,
      },
    };

    this.setState(newState);
  };

  render() {
    return (
      <DragDropContext
        // onDragStart
        // onDragUpdate
        onDragEnd={this.onDragEnd}
      >
        {this.state.columnOrder.map((columnId) => {
          const column = this.state.columns[columnId];
          const tasks = column.taskIds.map(
            (taskId) => this.state.tasks[taskId] // Uses lookup to map tasks in order
          );

          return (
            <Column key={column.id} column={column} tasks={tasks}></Column>
          );
        })}
      </DragDropContext>
    );
  }
}

export default App;
