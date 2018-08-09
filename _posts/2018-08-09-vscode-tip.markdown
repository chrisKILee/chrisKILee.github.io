---
title:  "Tip"
subtitle: "VScode tips"
author: "Chris Lee"
avatar: "img/authors/profile.png"
image: "img/code.png"
date:   2018-08-09 18:00:00
categories : Tip
---

### short-cut
- 편집기 분할
  - `CTRL` + `CMD` +  `방향키`
  - `CMD` + `숫자키`
  - `CMD` + `\`
- multi-selection
  - `SHIFT` + `ALT`
- 줄 이동
  - `ALT` + `방향키`
- 줄 복사 `mm`
  - `SHIFT` + `ALT` + `방향키`

```javascript
//TEST
var Card = function (id, el) {

        this.id = id;

        this._el = el;

        // Get elements.
        this._container = $(this._el).find(SELECTORS.container)[0];
        this._clip = $(this._el).find(SELECTORS.clip)[0];
        this._content = $(this._el).find(SELECTORS.content)[0];

        this.isOpen = false;

        this._TL = null;
    };
```