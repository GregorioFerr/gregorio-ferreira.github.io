import { redirect } from "next/navigation";

/**
 * The portfolio is a single page. This route is kept only so old links
 * keep working — delete this folder once nothing points at it.
 */
export default function PublicationsPage() {
  redirect("/#background");
}
