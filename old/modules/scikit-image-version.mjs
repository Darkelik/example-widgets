/**
 * scikit-image-version – anywidget that mirrors the version sidebar box from
 * https://scikit-image.org/ (from skimage-web _templates/sidebar_versions.html).
 * Fetches release info via GitHub API and renders Stable / Development version
 * with release notes and download links.
 *
 * AnyWidget-compatible ESM: exports default { render }.
 */

const GITHUB_RELEASES_URL =
  "https://api.github.com/repos/scikit-image/scikit-image/releases?per_page=5&page=1";
const DOCS_BASE = "https://scikit-image.org/docs/stable";
const RELEASE_NOTES_BASE = `${DOCS_BASE}/release_notes`;
const INSTALL_URL = `${DOCS_BASE}/user_guide/install.html`;
const INSTALL_DEV_ANCHOR = "#installing-scikit-image-for-contributors";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function notRc(release) {
  return !release.tag_name.includes("rc");
}

/**
 * Fetch latest stable release (non-draft, non-prerelease, non-RC) from GitHub.
 * @returns {Promise<{ tag_name: string, published_at: string } | null>}
 */
async function fetchStableRelease() {
  const res = await fetch(GITHUB_RELEASES_URL);
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  const data = await res.json();
  const release = data.find(
    (r) => !r.draft && !r.prerelease && notRc(r)
  );
  return release ? { tag_name: release.tag_name, published_at: release.published_at } : null;
}

/**
 * Build the sidebar box DOM (same structure as scikit-image.org sidebar).
 * Placeholder text is updated after fetch.
 */
function createSidebarBox(el) {
  const box = document.createElement("div");
  Object.assign(box.style, {
    fontFamily: "system-ui, -apple-system, sans-serif",
    fontSize: "14px",
    padding: "12px 14px",
    backgroundColor: "#f5f5f5",
    border: "1px solid #e3e3e3",
    borderRadius: "6px",
    color: "#333",
    lineHeight: "1.5",
  });

  // Stable row
  const stableLabel = document.createElement("strong");
  stableLabel.textContent = "Stable";
  stableLabel.style.display = "block";
  box.appendChild(stableLabel);

  const stableSub = document.createElement("span");
  const releaseNotesLink = document.createElement("a");
  releaseNotesLink.href = "";
  releaseNotesLink.target = "_blank";
  releaseNotesLink.rel = "noopener";
  releaseNotesLink.textContent = "release notes";
  releaseNotesLink.style.color = "#337ab7";
  stableSub.appendChild(document.createTextNode(" ("));
  stableSub.appendChild(releaseNotesLink);
  stableSub.appendChild(document.createTextNode(") "));
  box.appendChild(stableSub);

  const stableVersion = document.createElement("span");
  stableVersion.textContent = "x.y.z";
  box.appendChild(stableVersion);

  const stableDownload = document.createElement("p");
  stableDownload.style.margin = "6px 0 0 0";
  const stableDownloadLink = document.createElement("a");
  stableDownloadLink.href = INSTALL_URL;
  stableDownloadLink.target = "_blank";
  stableDownloadLink.rel = "noopener";
  stableDownloadLink.textContent = "Download";
  stableDownloadLink.style.fontWeight = "bold";
  stableDownloadLink.style.color = "#337ab7";
  stableDownload.appendChild(stableDownloadLink);
  box.appendChild(stableDownload);

  // Development row
  const devLabel = document.createElement("strong");
  devLabel.textContent = "Development";
  devLabel.style.display = "block";
  devLabel.style.marginTop = "10px";
  box.appendChild(devLabel);

  const devVersion = document.createElement("span");
  devVersion.textContent = "pre-x.y.z";
  box.appendChild(devVersion);

  const devDownload = document.createElement("p");
  devDownload.style.margin = "6px 0 0 0";
  const devDownloadLink = document.createElement("a");
  devDownloadLink.href = INSTALL_URL + INSTALL_DEV_ANCHOR;
  devDownloadLink.target = "_blank";
  devDownloadLink.rel = "noopener";
  devDownloadLink.textContent = "Download";
  devDownloadLink.style.fontWeight = "bold";
  devDownloadLink.style.color = "#337ab7";
  devDownload.appendChild(devDownloadLink);
  box.appendChild(devDownload);

  el.appendChild(box);

  return {
    releaseNotesLink,
    stableVersionEl: stableVersion,
    devVersionEl: devVersion,
  };
}

/**
 * Update DOM with release info.
 * Logic matches skimage-web sidebar_versions.html script exactly:
 *   - stable_version + " - " + month_names[parseInt(month)-1] + " " + year
 *   - release_notes_url = base + "/release_" + stable_version_majmin + ".rst"
 *   - dev_version = pre-(maj.(min+1))
 * We use DOCS_BASE for release notes (published .html); original uses link's href + .rst.
 */
function applyReleaseInfo(refs, release) {
  const tag = release.tag_name;
  const stable_version = tag.slice(1);
  const date = release.published_at;
  const year = date.substring(0, 4);
  const month = date.substring(5, 7);

  refs.stableVersionEl.textContent =
    stable_version + " - " + MONTH_NAMES[parseInt(month, 10) - 1] + " " + year;

  const stable_version_majmin = stable_version.split(".").slice(0, 2).join(".");
  // Same formula as original: base + "/release_" + stable_version_majmin + ext
  refs.releaseNotesLink.href = `${RELEASE_NOTES_BASE}/release_${stable_version_majmin}.html`;

  let dev_version = stable_version.split(".").map(Number);
  dev_version[1] += 1;
  dev_version = dev_version.slice(0, 2).join(".");
  refs.devVersionEl.textContent = "pre-" + dev_version;
}

/**
 * Show a short error message in the box.
 */
function showError(el, message) {
  const err = document.createElement("div");
  Object.assign(err.style, {
    padding: "8px 12px",
    backgroundColor: "#fef2f2",
    color: "#b91c1c",
    border: "1px solid #fecaca",
    borderRadius: "4px",
    fontSize: "13px",
  });
  err.textContent = message;
  el.appendChild(err);
}

export default {
  async render({ model, el }) {
    const refs = createSidebarBox(el);

    try {
      const release = await fetchStableRelease();
      if (release) {
        applyReleaseInfo(refs, release);
      } else {
        refs.stableVersionEl.textContent = "—";
        refs.devVersionEl.textContent = "—";
      }
    } catch (err) {
      refs.stableVersionEl.textContent = "—";
      refs.devVersionEl.textContent = "—";
      showError(el, "Could not load version info.");
    }

    return () => {
      el.innerHTML = "";
    };
  },
};
