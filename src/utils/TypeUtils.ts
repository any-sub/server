export function isPresent<T>(e: T | null): e is T {
  return Boolean(e);
}

type Part = "title" | "description" | "image" | "url";

export function partMapper<T>(mapper: (part: Part) => T): Record<Part, T> {
  return {
    title: mapper("title"),
    description: mapper("description"),
    image: mapper("image"),
    url: mapper("url")
  };
}
