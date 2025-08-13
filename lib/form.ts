export function toGoogleParams(data: {
  rating: number; likedMost?: string; improvements?: string; additionalComments?: string;
}) {
  const p = new URLSearchParams();
  p.set("entry.1761587451", String(data.rating));
  p.set("entry.1024140550", data.likedMost ?? "");
  p.set("entry.1565545793", data.improvements ?? "");
  p.set("entry.1137175505", data.additionalComments ?? "");
  p.set("fvv", "1");
  p.set("pageHistory", "0");
  return p.toString();
}
