import { Component } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Root } from '../pages/root';
import { Hello } from '../pages/hello';
import { Count } from '../pages/count';
import { Query } from '../pages/query';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root/>,
        children: [
            {
                path: '/hello',
                element: <Hello/>
            },
            {
                path: '/count',
                element: <Count/>
            },
            {
                path: '/query',
                element: <Query/>
            },
        ]
    },
])

export class App extends Component {
    render() {
        return (
            <RouterProvider router={router}></RouterProvider>
        );
    }
}