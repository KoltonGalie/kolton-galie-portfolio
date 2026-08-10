# Kolton Galie — Portfolio

A fast, dependency-free portfolio for software engineering, cybersecurity, automation, robotics, and systems work.

## Highlights

- Interactive canvas network and motion-aware interface
- Filterable, searchable projects driven by one structured data file
- Detailed project case-study route
- Responsive layout, semantic HTML, keyboard focus, and reduced-motion support
- Static deployment behind nginx and Cloudflare Tunnel

## Local development

```bash
npm run dev
```

Open `http://localhost:4173`. Build with `npm run build` and deploy on the production host with `sudo ./deploy.sh`.

## Add a project

Add one entry to `src/data/projects.js`. The project grid, filters, search, tags, and detail view are generated from that data.

## Privacy and source availability

This repository contains no production credentials, tunnel configuration, student data, or institutional datasets. Project GitHub links are intentionally omitted until each original source tree is located and independently sanitized.

## License

The portfolio source is licensed under the [MIT License](LICENSE). Personal
biographical content, project trademarks, screenshots, and third-party media
retain their respective rights and are not granted additional rights by the
source-code license.
