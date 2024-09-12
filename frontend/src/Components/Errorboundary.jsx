// import React, { Component } from 'react';

// class ErrorBoundary extends Component {
//     constructor(props) {
//         super(props);
//         this.state = { hasError: false };
//     }

//     static getDerivedStateFromError() {
//         // Update state so the next render will show the fallback UI
//         return { hasError: true };
//     }

//     componentDidCatch(error, errorInfo) {
//         // You can also log error messages to an error reporting service
//         console.error('ErrorBoundary caught an error:', error, errorInfo);
//     }

//     render() {
//         if (this.state.hasError) {
//             // You can render any custom fallback UI
//             return <h1>Something went wrong. Please try again later.</h1>;
//         }

//         return this.props.children; 
//     }
// }

// export default ErrorBoundary;

// src/Components/ErrorBoundary.jsx
import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <div className="error">Something went wrong.</div>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
