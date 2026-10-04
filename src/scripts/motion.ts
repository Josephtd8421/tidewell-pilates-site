// Scroll-entry reveals and the off-screen pause for the one ambient loop.
//
// [data-reveal]: only elements still below the fold when this runs are marked
// "pending" (and hidden by CSS); anything already on screen is left alone, so
// nothing visible ever flashes out. Without JS, or with reduced motion, no
// element is marked and everything renders as-is.
//
// [data-ambient]: the loop only runs while the element is on screen.

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduce && 'IntersectionObserver' in window) {
  const reveals = document.querySelectorAll<HTMLElement>('[data-reveal]');
  const revealer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        (e.target as HTMLElement).dataset.reveal = 'in';
        revealer.unobserve(e.target);
      }
    },
    { rootMargin: '0px 0px -10% 0px' },
  );
  for (const el of reveals) {
    if (el.getBoundingClientRect().top < window.innerHeight) continue;
    el.dataset.reveal = 'pending';
    revealer.observe(el);
  }

  const ambient = new IntersectionObserver((entries) => {
    for (const e of entries) (e.target as SVGElement | HTMLElement).dataset.ambient = e.isIntersecting ? 'on' : 'off';
  });
  for (const el of document.querySelectorAll('[data-ambient]')) ambient.observe(el);
}
