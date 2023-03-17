---
title: I ask the questions and you answer
---

<h3>I ask the questions and you answer</h3>
<button class ="get-question rounded-xl py-px px-4 text-2xl border-1 border-onwardFontColor dark:border-gray-100 bg-onwardPurplish dark:bg-blackberry" type="submit">get a question!</button>
<hr class="invisible">
<h4 class="question"></h4>
<form class = "invisible gform" id = "response-form" action="https://script.google.com/macros/s/AKfycbzXOpOGUv7e9Pj5TCHHCb6d6_Sy0OEvqN9g4-bPSH3Qnj4g8KalXpxoAa5Uobi_WWT4Hw/exec" method="POST">
    <input type="text" id="what-question" name="question" class = "hidden" value="question-answer">
    <textarea name="answer" rows="5" cols="50"  class = "w-full px-2 py-0.5 rounded border-1 border-onwardVeryDarkBlue font-spacious bg-white dark:bg-gray-200 dark:text-gray-600" required></textarea>
    <br>
    <button type="submit" class="text-sm py-px px-4 rounded-xl border-1 border-onwardVeryDarkBlue bg-onwardPurplish dark:bg-blackberry">send answer</button>
</form>
<p id="js-form-sending" class="hidden">sending...</p>
<p id="js-form-response"></p>
<button class ="get-another-question hidden text-sm py-px px-4 rounded-xl border-1 border-onwardVeryDarkBlue bg-onwardPurplish dark:bg-blackberry" type="submit">get another question!</button>
<p class = "out-of-questions hidden"> you've almost run me out of questions! i appreciate your enthusiasm. i've just got one final question: what questions do you have? </p>
<button class ="give-questions hidden nice-btn" type="submit">give questions</button>
