---
eleventyExcludeFromCollections: true
layout: page.njk
title: Why
templateEngineOverride: njk
---

You can put your own page here.

<ul>
{%- for post in collections.exa -%}
  <li>{{ post.data.title }}</li>
{%- endfor -%}
</ul>


oo

<ul>
{%- for post in collections.aLover -%}
  <li>{{ post.data.title }}</li>
{%- endfor -%}
</ul>