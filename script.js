// Custom Cursor

const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Dynamic Table

document.querySelectorAll('.tooltip-row').forEach(cell => {

    // Three-Part Selector

    const tooltip = cell.querySelector('.tooltip');
    const left = cell.querySelector('.left');
    const right = cell.querySelector('.right');

    // Mouse Hover Listener

    cell.addEventListener('mousemove', (e) => {

        // Fade In Animations

        tooltip.style.transition = 'opacity 0.4s ease';
        tooltip.style.opacity = 1;

        left.style.transition = 'opacity 0.4s ease';
        left.style.opacity = 0.5;

        right.style.transition = 'opacity 0.4s ease';
        right.style.opacity = 0.5;


        // Tooltip Position Calculations

        const tooltipRect = tooltip.getBoundingClientRect();
        const tooltipWidth = tooltipRect.width;
        const tooltipHeight = tooltipRect.height;

        tooltip.style.left = (e.clientX - tooltipWidth / 2) + 'px';
        tooltip.style.top = (e.clientY - tooltipHeight - 10) + 'px';
    });

    // Mouse Leave Listener

    cell.addEventListener('mouseleave', () => {

        // Default State Animations

        tooltip.style.transition = 'opacity 0.2s ease';
        tooltip.style.opacity = 0;

        left.style.transition = 'opacity 0.2s ease';
        left.style.opacity = 1;

        right.style.transition = 'opacity 0.2s ease';
        right.style.opacity = 1;
    });
});