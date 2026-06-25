# WebDNA Conversions

A collection of WebDNA conversion tools, built as a starting block for the WebDNA community to develop a shared set of converters based on the WebDNA programming language.

Created by Stuart Tremain ([@plsoftware](https://github.com/WebDNA-Software)).

## Overview

A single-page app (`index.html`) presenting a tabbed set of conversion utilities. Some tabs use server-side WebDNA tags for their calculations; others are pure client-side JavaScript. The UI is built with Bootstrap 5.3.2 and jQuery 3.7.1.

## Tools

| Tab | Conversion | Engine |
|-----|------------|--------|
| **Date** | Date (`dd/mm/yyyy`) ⇄ WebDNA day number | WebDNA |
| **Date USA** | Date (`mm/dd/yyyy`) ⇄ WebDNA day number | WebDNA |
| **Time** | Time (`hh:mm:ss`) ⇄ seconds | WebDNA |
| **Encrypt** | Encrypt / decrypt a value (APOP, bcrypt, HMAC-SHA256/512, SHA1/256, Base64, blowfish, twofish, AES, GCM) | WebDNA |
| **Cart** | Display the current WebDNA `[cart]` value | WebDNA |
| **Unix Timestamp** | Date + time ⇄ Unix timestamp | WebDNA |
| **Subnet Calculator** | Network address + mask bits → subnet ranges | JavaScript |
| **IPv4 Subnet Calculator** | CIDR block → host range, broadcast, wildcard, CIDR | JavaScript |
| **Linux chmod Calculator** | Permission checkboxes ⇄ numeric (octal) / symbolic | JavaScript |
| **Password Generator** | Generate passwords with configurable character sets and length | JavaScript |

## Requirements

- WebDNA Server or FastCGI **v8.x** (required for the WebDNA-powered tabs)
- A modern browser (the JavaScript-only tabs work without WebDNA)

## Project structure

```
index.html              Main tabbed UI (HTML + WebDNA tags)
css/custom.css          Custom styles
bootstrap-5.3.2/        Bootstrap CSS/JS
js/
  jquery-3.7.1.js       jQuery
  copy-button.js        Copy-to-clipboard buttons
  simple-subnet.js      Subnet Calculator
  ipv4-subnet.js        IPv4 Subnet Calculator
  chmod.js              Linux chmod Calculator
  pwordgen.js           Password Generator
```

## Installation

1. Copy the project files to a WebDNA-enabled web root (e.g. the document root of your WebDNA Server / FastCGI host).
2. Browse to `index.html`. The WebDNA tabs are processed server-side; the JavaScript tabs run entirely in the browser.

> **Note:** Asset paths in `index.html` are root-relative (e.g. `/bootstrap-5.3.2/...`, `/js/...`, `/css/...`), so serve the project from the site root, or adjust the paths if deploying to a subdirectory.

## License

See [LICENSE](LICENSE).
