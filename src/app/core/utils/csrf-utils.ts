export function getCookie(name: string): string | null {
  const value = document.cookie
    .split('; ')
    .find(c => c.startsWith(name + '='));

  if (!value) return null;

  return decodeURIComponent(value.split('=')[1]);
}
