import { useState } from "react";

export default function usePagination<T>(data: T[], perPage: number = 4) {
  const [page, setPage] = useState(1);
  const maxPage = Math.ceil(data.length / perPage);

  const current = data.slice((page - 1) * perPage, page * perPage);

  return {
    page,
    maxPage,
    current,
    next: () => setPage((p) => Math.min(p + 1, maxPage)),
    prev: () => setPage((p) => Math.max(p - 1, 1)),
    jump: (n: number) => setPage(Math.max(1, Math.min(n, maxPage))),
  };
}
