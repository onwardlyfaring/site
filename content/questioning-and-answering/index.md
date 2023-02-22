---
layout: page.njk
title: Q & A
tags: 
  - page
permalink: /page/questions-and-answers/
---

## Q & A

### I ask the questions and you answer
<link rel="stylesheet" href="/assets/q-and-a-styles.css">

<button class ="get-question rounded-xl py-px px-4 text-2xl border-1 border-onwardFontColor dark:border-gray-100 bg-onwardPurplish dark:bg-blackberry" type="submit">get a question!</button>

<hr class=invisible>
<h4 class="question"></h4>
<form class = "gform invisible" id = "response-form" action="https://script.google.com/macros/s/AKfycbzXOpOGUv7e9Pj5TCHHCb6d6_Sy0OEvqN9g4-bPSH3Qnj4g8KalXpxoAa5Uobi_WWT4Hw/exec" method="POST">
  <input type="text" id="what-question" name="question" class = "hidden" value="question-answer">
  <textarea name="answer" rows="5" cols="50"  class = "px-2 py-0.5 rounded border-1 border-onwardVeryDarkBlue font-spacious bg-white dark:bg-gray-200 dark:text-gray-600" required></textarea>
  <br>
  <button type="submit" class="text-sm py-px px-4 rounded-xl border-1 border-onwardVeryDarkBlue bg-onwardPurplish dark:bg-blackberry">send answer</button>
</form>
<p id="js-form-sending" class="hidden">sending...</p>
<p id="js-form-response"></p>
<button class ="get-another-question hidden text-sm py-px px-4 rounded-xl border-1 border-onwardVeryDarkBlue bg-onwardPurplish dark:bg-blackberry" type="submit">get another question!</button>
<p class = "out-of-questions hidden"> you've almost run me out of questions! i appreciate your enthusiasm. i've just got one final question: what questions do you have? </p>
<button class ="give-questions hidden nice-btn" type="submit">give questions</button>

*** 
### You ask the questions, and I'll answer
Questions people ask me that I don't have concise answers to:
- [What do you mean when you say you live in an intentional community affiliated with a church?](/2022/10/23/intentional-community/)
- Why do you go to church? Are you Christian?

***

### I ask the questions, and I also answer them
experiments i've tried 

- not listening to secular music during lent 
- no more airpods / making an effort to listen to media while doing other things less
- having personal goals with end dates attached
- write-only twitter

*** 

### I ask the questions, but they remain unanswered
some open questions



<script type="text/javascript">
  var questionsList = {{questions}};
  var toEnd = false;

  function giveQuestion(){
    document.getElementById("js-form-response").innerHTML=""
    this.classList.add("hidden");
    var itemIndex = Math.floor(Math.random() * questionsList.length)
    var item = questionsList[itemIndex];
    questionsList.splice(itemIndex, 1);
    document.querySelector("hr").classList.remove("invisible");
    document.querySelector(".question").innerText = item;
    document.querySelector("#response-form").classList.remove("invisible");
  }

  function receiveQuestions(){
    document.getElementById("js-form-response").innerHTML=""
    document.querySelector(".out-of-questions").classList.add("hidden");
    document.querySelector(".give-questions").classList.add("hidden");
    document.querySelector(".question").innerText = "what questions do you have?"
    document.querySelector("#response-form").classList.remove("invisible");
    toEnd = true;
  }

  document.querySelector(".get-question").addEventListener("click", giveQuestion);
  document.querySelector(".get-another-question").addEventListener("click", giveQuestion);
  document.querySelector(".give-questions").addEventListener("click", receiveQuestions);
  </script>

  <script type="text/javascript">
    (function() {
      // get all data in form and return object
      function getFormData(form) {
        var elements = form.elements;
        var honeypot;

        var fields = Object.keys(elements).filter(function(k) {
          if (elements[k].name === "honeypot") {
            honeypot = elements[k].value;
            return false;
          }
          return true;
        }).map(function(k) {
          if(elements[k].name !== undefined) {
            return elements[k].name;
          // special case for Edge's html collection
          }else if(elements[k].length > 0){
            return elements[k].item(0).name;
          }
        }).filter(function(item, pos, self) {
          return self.indexOf(item) == pos && item;
        });

        var formData = {};
        fields.forEach(function(name){
          var element = elements[name];

          // singular form elements just have one value
          formData[name] = element.value;

          // when our element has multiple items, get their values
          if (element.length) {
            var data = [];
            for (var i = 0; i < element.length; i++) {
              var item = element.item(i);
              if (item.checked || item.selected) {
                data.push(item.value);
              }
            }
            formData[name] = data.join(', ');
          }
        });

        // add form-specific values into the data
        formData.formDataNameOrder = JSON.stringify(fields);
        formData.formGoogleSheetName = form.dataset.sheet || "responses"; // default sheet name
        formData.formGoogleSendEmail
          = form.dataset.email || ""; // no email by default

        return {data: formData, honeypot: honeypot};
      }

      function handleFormSubmit(event) {  // handles form submit without any jquery
        event.preventDefault();           // we are submitting via xhr below

        document.getElementById("what-question").value = document.getElementsByClassName("question")[0].innerHTML;

        var form = event.target;
        var formData = getFormData(form);
        var data = formData.data;

        // If a honeypot field is filled, assume it was done so by a spam bot.
        if (formData.honeypot) {
          return false;
        }

        // disableAllButtons(form);
        document.getElementById("js-form-sending").classList.remove("hidden")
        var url = form.action;
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        // xhr.withCredentials = true;
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
            document.getElementById("js-form-sending").classList.add("hidden")
            if (xhr.readyState === 4 && xhr.status === 200) {
              form.reset();
              document.querySelector(".question").innerText="";
              document.querySelector("#response-form").classList.add("invisible");
              if (toEnd === false){
                document.getElementById("js-form-response").innerHTML = "thanks for the answer :)";
                console.log(questionsList.length);
                if (questionsList.length>0){
                  document.querySelector(".get-another-question").classList.remove("hidden");
                } else{
                  document.querySelector(".out-of-questions").classList.remove("hidden");
                  document.querySelector(".give-questions").classList.remove("hidden");
                }
              } else{
                document.getElementById("js-form-response").innerHTML = ":)";
              }

            }
        };
        // url encode form data for sending as post data
        var encoded = Object.keys(data).map(function(k) {
            return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
        }).join('&');
        xhr.send(encoded);
      }

      function loaded() {
        // bind to the submit event of our form
        var forms = document.querySelectorAll("form.gform");
        for (var i = 0; i < forms.length; i++) {
          forms[i].addEventListener("submit", handleFormSubmit, false);
        }
      };
      document.addEventListener("DOMContentLoaded", loaded, false);

      function disableAllButtons(form) {
        var buttons = form.querySelectorAll("button");
        for (var i = 0; i < buttons.length; i++) {
          buttons[i].disabled = true;
        }
      }
    })();

  </script>