import { createContext, useContext } from "react";

export const TodoContext = createContext({
    todos :[                    // here, we just define the varaible with its values
        {
            id: 1,
            todo: "todo msg",
            completed: false,
        }
    ],
    addTodo: (todo) => {},          // & its methods
    updateTodo: (id, todo) => {},
    deleteTodo: (id) => {},
    toggleComplete: (id) => {},
})

export const useTodo = () => {          // this is our custom hook (useTodo) inside which we are returing Context.
    return useContext(TodoContext)
}

export const TodoProvider = TodoContext.Provider