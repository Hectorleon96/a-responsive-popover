# Smart Popover

A lightweight popover component built with Vanilla JavaScript, HTML and CSS.

The goal of this project is to create a floating popover that automatically adapts to the available viewport space without relying on external libraries or frameworks.

## Overview

Most popovers are more than a simple show/hide element.

A production-ready popover must be able to react to changes in the viewport, scrolling, content size and user interactions.

This project explores how to solve those challenges using browser APIs and native DOM manipulation.

## What Problem Does It Solve?

When a popover is displayed near the edges of the viewport, there may not be enough available space to render it correctly.

This component automatically:

- Detects when the popover no longer fits above the trigger element.
- Repositions itself below the trigger when necessary.
- Re-evaluates its position while the user scrolls.
- Reacts to viewport size changes.
- Adjusts its dimensions on smaller screens.
- Closes when the user clicks outside of it.
- Handles large content through internal scrolling.

The result is a floating UI element that adapts to the available space instead of relying on a fixed position.

## Features

- Automatic top/bottom positioning.
- Responsive behavior for mobile devices.
- Click outside detection.
- Dynamic repositioning on scroll.
- ResizeObserver integration.
- Element measurement using `getBoundingClientRect()`.
- Internal scrolling for long content.
- No dependencies.
- Built with Vanilla JavaScript.

## Browser APIs Used

This project was also created as a learning exercise to explore modern browser APIs such as:

- `ResizeObserver`
- `Event.composedPath()`
- `Element.getBoundingClientRect()`
- `window.innerWidth`
- `window.innerHeight`

## Technical Highlights

The popover continuously evaluates:

- Available viewport space.
- Current element position.
- Scroll changes.
- Layout changes caused by resizing.

Based on those measurements it decides whether the popover should be displayed above or below its trigger element.

## Technologies

- HTML5
- CSS3
- JavaScript (ES6+)

## Why Build This?

The objective was to better understand how floating UI components work internally instead of relying on existing libraries.

By building the component from scratch it was possible to explore:

- DOM measurements.
- Position calculations.
- Event handling.
- Responsive layouts.
- Modern browser APIs.

## Future Improvements

Potential enhancements include:

- Left and right positioning.
- Start and end alignments.
- Keyboard accessibility (Escape key support).
- Focus management.
- Animations and transitions.
- Multiple popover instances.
- Configurable positioning strategies.

## License

MIT
