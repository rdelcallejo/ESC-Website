// Custom Cursor
const cursor = document.querySelector('.cursor');

// Utility functions to avoid repetition
function setOpacity(element, value, duration = 0.2) {
    element.style.transition = `opacity ${duration}s ease`;
    element.style.opacity = value;
}

function setDisplay(element, displayType) {
    element.style.display = displayType;
}

function handleMouseMove(e) {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
}

function handleTooltipHover(cell, tooltip, left, right) {
    const hoverHandler = (e) => {
        setOpacity(tooltip, 1, 0.4);
        setOpacity(left, 0.5, 0.4);
        setOpacity(right, 0.5, 0.4);

        const tooltipRect = tooltip.getBoundingClientRect();
        const tooltipWidth = tooltipRect.width;
        const tooltipHeight = tooltipRect.height;

        tooltip.style.left = `${e.clientX - tooltipWidth / 2}px`;
        tooltip.style.top = `${e.clientY - tooltipHeight - 10}px`;
    };

    const leaveHandler = () => {
        setOpacity(tooltip, 0);
        setOpacity(left, 1);
        setOpacity(right, 1);
    };

    cell.addEventListener('mousemove', hoverHandler);
    cell.addEventListener('mouseleave', leaveHandler);

    // Return functions to allow removal of listeners later
    return { hoverHandler, leaveHandler };
}

function removeTooltipHover(cell, hoverHandler, leaveHandler) {
    cell.removeEventListener('mousemove', hoverHandler);
    cell.removeEventListener('mouseleave', leaveHandler);
}

function handleDropdown(cell) {
    const hiddenRow = cell.nextElementSibling;

    const dropdownHandler = () => {
        // Check if the row is currently hidden
        if (hiddenRow.style.display === 'none' || hiddenRow.style.display === '') {
            // Show the row with slide-in animation
            hiddenRow.style.display = 'table-row';
            hiddenRow.style.animation = 'slideIn 1.6s forwards'; // Slide in effect
        } else {
            // Hide the row with slide-out animation
            hiddenRow.style.animation = 'slideOut 1.0s forwards'; // Slide out effect
            setTimeout(() => {
                hiddenRow.style.display = 'none'; // Fully hide after animation
            }, 1000); // Match timeout with animation duration
        }
        cell.classList.toggle('expanded');
    };

    // Add click listener only to initially visible rows (those without the 'hidden-row' class)
    if (!cell.classList.contains('hidden-row')) {
        cell.addEventListener('click', dropdownHandler);
    }

    return dropdownHandler; // Return the handler to allow removal if needed
}

function removeDropdown(cell, dropdownHandler) {
    cell.removeEventListener('click', dropdownHandler);
}

// Debounce function for window resize events
function debounce(func, delay) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

function toggleScreenFunctions() {
    const screenWidth = window.innerWidth;
    const bodyElement = document.body;
    const tooltipRows = document.querySelectorAll('.tooltip-row');

    if (screenWidth >= 768) {
        cursor.style.display = 'block';
        bodyElement.style.cursor = 'none';
        document.addEventListener('mousemove', handleMouseMove);

        tooltipRows.forEach(cell => {
            const hiddenRow = cell.nextElementSibling;

            // Ensure all hidden rows (dropdowns) are hidden when loading on large screens
            if (hiddenRow && hiddenRow.classList.contains('hidden-row')) {
                hiddenRow.style.display = 'none'; // Ensure hidden rows are hidden on large screens
            }

            if (!cell.hoverHandlers) {
                const tooltip = cell.querySelector('.tooltip');
                const left = cell.querySelector('.left');
                const right = cell.querySelector('.right');
                cell.hoverHandlers = handleTooltipHover(cell, tooltip, left, right);
            }

            if (cell.dropdownHandler) {
                removeDropdown(cell, cell.dropdownHandler);
                cell.dropdownHandler = null;
            }
        });

    } else {
        cursor.style.display = 'none';
        bodyElement.style.cursor = 'auto';
        document.removeEventListener('mousemove', handleMouseMove);

        tooltipRows.forEach(cell => {
            const hiddenRow = cell.nextElementSibling;

            if (cell.hoverHandlers) {
                removeTooltipHover(cell, cell.hoverHandlers.hoverHandler, cell.hoverHandlers.leaveHandler);
                cell.hoverHandlers = null;
            }

            if (!cell.dropdownHandler) {
                cell.dropdownHandler = handleDropdown(cell);
            }
        });
    }
}

// Attach resize listener (debounced) and initialize tooltips
window.addEventListener('resize', debounce(toggleScreenFunctions, 200));
toggleScreenFunctions();
