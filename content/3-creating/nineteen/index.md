---
layout: fixedRA_base.njk
title: nineteen
templateEngineOverride: njk
include_aside: false 
tags: 
  - page
permalink: /nineteen/
---
{% import "./macros.njk" as macro with context %}

{% extends "./_collectionCircleWrapper.html" %}

{% block myTitle %}
{% endblock %}

{% block circleContents %}

<h1> to be nineteen and embodied </h1>
{{macro.collectionCircles(collections.embodiment)}}

<h1> to be nineteen and not in love </h1>
{{macro.collectionCircles(collections.aLover)}}

<h1> to be nineteen and familiar with a place </h1>
{{macro.collectionCircles(collections.familiarSpace)}}

<h1> to be nineteen and forging beliefs </h1>
{{macro.collectionCircles(collections.bigThoughts)}}
{% endblock %}
