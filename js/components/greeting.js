export function createGreeting(text) {
  const heading = document.createElement('h1');
  heading.textContent = text;
  return heading;
}
