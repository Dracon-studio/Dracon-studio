const translations = {
  en: {
    navHome: "Home",
    navSupport: "Support Us",
    commentsTitle: "Comments",
    addComment: "Add Comment",
    edit: "✏️ Edit",
    report: "⚠️ Report",
    rights: "© 2025 All rights belong to the original authors.",
    placeholder: "Write a comment..."
  },
  ua: {
    navHome: "Головна",
    navSupport: "Підтримати нас",
    commentsTitle: "Коментарі",
    addComment: "Додати коментар",
    edit: "✏️ Редагувати",
    report: "⚠️ Поскаржитись",
    rights: "© 2025 Всі права належать оригінальним авторам.",
    placeholder: "Напиши коментар..."
  }
};

const langSwitcher = document.getElementById("languageSwitcher");
const commentInput = document.getElementById("commentInput");
const addCommentBtn = document.getElementById("addCommentBtn");
const commentsList = document.getElementById("commentsList");
const likeBtn = document.getElementById("likeBtn");
const dislikeBtn = document.getElementById("dislikeBtn");

let comments = [];
let likeCount = 0;
let dislikeCount = 0;
let liked = false;
let disliked = false;

function updateLikeDisplay() {
  likeBtn.textContent = `👍 ${likeCount}`;
  dislikeBtn.textContent = `👎 ${dislikeCount}`;
}

likeBtn.addEventListener("click", () => {
  if (liked) {
    likeCount--;
  } else {
    likeCount++;
    if (disliked) {
      dislikeCount--;
      disliked = false;
    }
  }
  liked = !liked;
  updateLikeDisplay();
});

dislikeBtn.addEventListener("click", () => {
  if (disliked) {
    dislikeCount--;
  } else {
    dislikeCount++;
    if (liked) {
      likeCount--;
      liked = false;
    }
  }
  disliked = !disliked;
  updateLikeDisplay();
});

addCommentBtn.addEventListener("click", () => {
  const text = commentInput.value.trim();
  if (!text) return;
  const lang = langSwitcher.value;
  comments.push({
    text,
    likes: 0,
    dislikes: 0,
    userLiked: false,
    userDisliked: false,
    editText: translations[lang].edit,
    reportText: translations[lang].report
  });
  commentInput.value = "";
  renderComments();
});

function renderComments() {
  commentsList.innerHTML = "";
  comments.forEach((comment, index) => {
    const div = document.createElement("div");
    div.className = "comment";
    div.style.border = "1px solid #ccc";
    div.style.borderRadius = "6px";
    div.style.padding = "10px";
    div.style.marginBottom = "10px";
    div.style.backgroundColor = "#fff";

    const text = document.createElement("p");
    text.textContent = comment.text;

    const controls = document.createElement("div");

    const like = document.createElement("button");
    like.textContent = `👍 ${comment.likes}`;
    like.onclick = () => {
      if (comment.userLiked) {
        comment.likes--;
      } else {
        comment.likes++;
        if (comment.userDisliked) {
          comment.dislikes--;
          comment.userDisliked = false;
        }
      }
      comment.userLiked = !comment.userLiked;
      renderComments();
    };

    const dislike = document.createElement("button");
    dislike.textContent = `👎 ${comment.dislikes}`;
    dislike.onclick = () => {
      if (comment.userDisliked) {
        comment.dislikes--;
      } else {
        comment.dislikes++;
        if (comment.userLiked) {
          comment.likes--;
          comment.userLiked = false;
        }
      }
      comment.userDisliked = !comment.userDisliked;
      renderComments();
    };

    const edit = document.createElement("button");
    edit.textContent = comment.editText;
    edit.onclick = () => {
      const newText = prompt("Редагувати коментар:", comment.text);
      if (newText !== null && newText.trim()) {
        comment.text = newText.trim();
        renderComments();
      }
    };

    const report = document.createElement("button");
    report.textContent = comment.reportText;
    report.onclick = () => {
      alert("Скарга надіслана на модерацію.");
    };

    [like, dislike, edit, report].forEach(btn => {
      btn.style.marginRight = "10px";
    });

    controls.appendChild(like);
    controls.appendChild(dislike);
    controls.appendChild(edit);
    controls.appendChild(report);

    div.appendChild(text);
    div.appendChild(controls);
    commentsList.appendChild(div);
  });
}

function updateLanguage(lang) {
  const t = translations[lang];
  document.getElementById("commentsTitle").textContent = t.commentsTitle;
  addCommentBtn.textContent = t.addComment;
  commentInput.placeholder = t.placeholder;
  document.getElementById("navHome").textContent = t.navHome;
  document.getElementById("navSupport").textContent = t.navSupport;
  document.getElementById("footerRights").textContent = t.rights;

  comments.forEach(comment => {
    comment.editText = t.edit;
    comment.reportText = t.report;
  });

  renderComments();
}

langSwitcher.addEventListener("change", () => {
  updateLanguage(langSwitcher.value);
});

updateLanguage("en");
