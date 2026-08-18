(function () {
  const targets = document.querySelectorAll("[data-post-list]");
  if (!targets.length) return;

  const escapeHTML = (value) => String(value || "").replace(/[&<>'"]/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
  })[char]);

  const formatDate = (value) => {
    const date = new Date(`${value}T00:00:00+07:00`);
    return Number.isNaN(date.getTime()) ? "" : new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit", month: "2-digit", year: "numeric"
    }).format(date);
  };

  const archiveCard = (post) => `
    <article class="post-card" data-search="${escapeHTML(`${post.title} ${post.keyword} ${post.category}`.toLowerCase())}">
      <a href="${escapeHTML(post.url)}" aria-label="Xem bài ${escapeHTML(post.title)}">
        <figure><img src="${escapeHTML(post.image)}" alt="${escapeHTML(post.alt)}" width="900" height="900" loading="lazy" decoding="async"></figure>
      </a>
      <div class="post-card-body">
        <small>${escapeHTML(post.category)} · ${escapeHTML(formatDate(post.date))}</small>
        <h2><a href="${escapeHTML(post.url)}">${escapeHTML(post.title)}</a></h2>
        <p>${escapeHTML(post.description)}</p>
        <a class="read-more" href="${escapeHTML(post.url)}">Xem chi tiết →</a>
      </div>
    </article>`;

  const homeCard = (post) => `
    <article class="post reveal visible">
      <a class="home-post-link" href="${escapeHTML(post.url)}" aria-label="Xem bài ${escapeHTML(post.title)}">
        <div class="post-img"><img src="${escapeHTML(post.image)}" alt="${escapeHTML(post.alt)}" width="900" height="900" loading="lazy" decoding="async"></div>
        <div class="post-body">
          <small>${escapeHTML(post.category)}</small>
          <h3>${escapeHTML(post.title)}</h3>
          <p>${escapeHTML(post.description)}</p>
        </div>
      </a>
    </article>`;

  fetch("/bai-viet/bai-viet.json", { cache: "no-cache" })
    .then((response) => {
      if (!response.ok) throw new Error("Không tải được dữ liệu bài viết");
      return response.json();
    })
    .then((posts) => {
      posts.sort((a, b) => String(b.date).localeCompare(String(a.date)));
      targets.forEach((target) => {
        const mode = target.dataset.postList;
        const current = target.dataset.current || "";
        let visiblePosts = posts.filter((post) => post.url !== current);
        if (mode === "home") visiblePosts = visiblePosts.slice(0, 3);
        if (mode === "related") visiblePosts = visiblePosts.slice(0, 3);
        const renderer = mode === "home" ? homeCard : archiveCard;
        target.innerHTML = visiblePosts.length
          ? visiblePosts.map(renderer).join("")
          : '<div class="empty-state">Chưa có bài viết phù hợp.</div>';
      });
      document.querySelectorAll("[data-post-count]").forEach((node) => {
        node.textContent = `${posts.length} bài viết`;
      });

      const search = document.querySelector("#postSearch");
      if (search) {
        search.addEventListener("input", () => {
          const query = search.value.toLowerCase().trim();
          document.querySelectorAll(".post-card").forEach((card) => {
            card.hidden = !card.dataset.search.includes(query);
          });
        });
      }
    })
    .catch(() => {
      targets.forEach((target) => {
        target.innerHTML = '<div class="empty-state">Không tải được danh sách bài viết. Hãy kiểm tra lại tệp bai-viet.json.</div>';
      });
    });
})();
