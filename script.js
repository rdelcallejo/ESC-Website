const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.querySelectorAll('.ttr').forEach(cell => {
    const tooltip = cell.querySelector('.tooltip');
    const left = cell.querySelector('.left');
    const right = cell.querySelector('.right');

    cell.addEventListener('mousemove', (e) => {
        tooltip.style.transition = 'opacity 0.4s ease'; // Slow fade in
        tooltip.style.opacity = 1;

        const tooltipRect = tooltip.getBoundingClientRect();
        const tooltipWidth = tooltipRect.width;
        const tooltipHeight = tooltipRect.height;

        tooltip.style.left = (e.clientX - tooltipWidth / 2) + 'px';
        tooltip.style.top = (e.clientY - tooltipHeight - 10) + 'px';

        left.style.transition = 'opacity 0.4s ease';
        left.style.opacity = 0.5;

        right.style.transition = 'opacity 0.4s ease';
        right.style.opacity = 0.5;
    });

    cell.addEventListener('mouseleave', () => {
        tooltip.style.transition = 'opacity 0.2s ease';
        tooltip.style.opacity = 0;

        left.style.transition = 'opacity 0.2s ease';
        left.style.opacity = 1;

        right.style.transition = 'opacity 0.2s ease';
        right.style.opacity = 1;
    });
});