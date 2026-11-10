import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { resolve, join, relative } from 'node:path';

const root = resolve('dist');
const origin = 'https://portfolio.javic.tech';
function walk(directory) {
  return readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}
assert.ok(existsSync(root), 'Run npm run build before npm test');
const pages = walk(root).filter((path) => path.endsWith('.html'));
function pagePath(pathname) {
  const path = join(root, decodeURIComponent(pathname));
  return existsSync(path) && statSync(path).isDirectory()
    ? join(path, 'index.html')
    : path;
}
function attributes(tag) {
  return Object.fromEntries(
    [...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((match) => [
      match[1],
      match[2],
    ]),
  );
}

test('homepage, three case studies, and a useful 404 are generated', () => {
  assert.equal(pages.length, 5);
  for (const route of [
    '/',
    '/projects/private-markets-tracker/',
    '/projects/language-model-calibration/',
    '/projects/cross-platform-mobile/',
    '/404.html',
  ]) {
    assert.ok(existsSync(pagePath(route)), `Missing ${route}`);
  }
});

test('every page has unique metadata, a main landmark, and accessible images', () => {
  const titles = new Set();
  for (const page of pages) {
    const html = readFileSync(page, 'utf8');
    const location = relative(root, page);
    const title = [...html.matchAll(/<title>(.*?)<\/title>/g)];
    assert.equal(title.length, 1, `${location}: one title`);
    titles.add(title[0][1]);
    assert.equal(
      (html.match(/<h1(?:\s|>)/g) ?? []).length,
      1,
      `${location}: one h1`,
    );
    assert.match(html, /<main\b[^>]*id="main"/, location);
    assert.equal(
      (html.match(/name="description"/g) ?? []).length,
      1,
      `${location}: one description`,
    );
    assert.match(
      html,
      /rel="canonical" href="https:\/\/portfolio\.javic\.tech\//,
      location,
    );
    assert.match(
      html,
      /property="og:image" content="https:\/\/portfolio\.javic\.tech\/social-card\.png"/,
      location,
    );
    assert.doesNotMatch(
      html,
      /astro-island|data-aos|formsubmit\.co|carmor\.me/,
      location,
    );
    for (const [tag] of html.matchAll(/<img\b[^>]*>/g)) {
      const attrs = attributes(tag);
      assert.ok(attrs.alt?.length, `${location}: image alternative text`);
      assert.ok(
        Number(attrs.width) > 0 && Number(attrs.height) > 0,
        `${location}: image dimensions`,
      );
    }
  }
  assert.equal(titles.size, pages.length);
});

test('internal navigation, page anchors, and linked assets resolve', () => {
  for (const page of pages) {
    const html = readFileSync(page, 'utf8');
    const url = new URL(relative(root, page), `${origin}/`);
    for (const [tag] of html.matchAll(/<(?:a|link|img|meta)\b[^>]*>/g)) {
      const attrs = attributes(tag);
      const target =
        attrs.href ??
        attrs.src ??
        (attrs.property === 'og:image' ? attrs.content : null);
      if (!target || target.startsWith('mailto:')) continue;
      const link = new URL(target, url);
      if (link.origin !== origin) continue;
      const path = pagePath(link.pathname);
      assert.ok(existsSync(path), `${url.pathname}: broken link ${target}`);
      if (link.hash) {
        const linkedHtml = readFileSync(path, 'utf8');
        const ids = [...linkedHtml.matchAll(/\bid="([^"]+)"/g)].map(
          (match) => match[1],
        );
        assert.ok(
          ids.includes(decodeURIComponent(link.hash.slice(1))),
          `${url.pathname}: missing anchor ${target}`,
        );
      }
    }
  }
});

test('final ML results distinguish fine-tuning from calibration', () => {
  const html = readFileSync(
    pagePath('/projects/language-model-calibration/'),
    'utf8',
  ).replace(/\s+/g, ' ');
  for (const metric of [
    '49.33%',
    '65.17%',
    '92.00%',
    '82.60%',
    '65.07%',
    '3.7584',
    '1.1344',
    '0.9160',
    '42.94%',
    '17.43%',
    '3.91%',
  ]) {
    assert.ok(html.includes(metric), `Missing metric ${metric}`);
  }
  assert.match(html, /600 questions/);
  assert.match(
    html,
    /8,341 training \/ 400 validation \/ 400 calibration \/ 600 held out/,
  );
  assert.match(html, /not an independent external benchmark/);
  assert.doesNotMatch(html, /45\.23|91\.08|50\.78|854|367/);
  assert.match(html, /https:\/\/github.com\/javicrg\/diy-jev/);
});

test('private mobile project publishes no screenshot, demo, or invented repository', () => {
  const html = readFileSync(
    pagePath('/projects/cross-platform-mobile/'),
    'utf8',
  );
  assert.doesNotMatch(html, /<img\b|View on GitHub|App Store|relationship/i);
  assert.match(html, /Ongoing · Private source/);
});
