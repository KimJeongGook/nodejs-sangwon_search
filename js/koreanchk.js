exports.koreanChk = function (type, word) {
   var sql = "";
   var first_word = "";
   var second_word = "";
   var third_word = "";
   var four_word = "";
   var five_word = "";
   var six_word = "";
   var seven_word = "";
   var eight_word = ""; 

   function order(type, num, first, second){

      if(jungseong === undefined){
         var order_str = "substr(" + type + ", " + num + " , 1) between '" + first + "' and '" + second + "' ";
      } else if (jongseong === '' || jongseong === undefined) {
         var order_str = " substr(" + type + ", " + num + " , 1) between '" + word[i] + "' and '" + sumHangul(choseong, jungseong, 'ㅎ')  + "' ";
      } else {
         var order_str = " substr(" + type + ", " + num + " , 1) between '" + word[i] + "' and '" +  word[i]  + "' ";
      }
      return order_str;
   }

   function checkString(length, num, first, second) {

      if (length === 1) {
         sql += " ( " + order(type, 1, first, second);
         sql += " or " + order(type, 2, first, second);
         sql += " or " + order(type, 3, first, second);
         sql += " or " + order(type, 4, first, second);
         sql += " or " + order(type, 5, first, second)+ ") ";
       } else {
         if(num == 0){
            first_word += " ( " + order(type, 1, first, second);
            second_word += " or (" + order(type, (num+2), first, second);
            third_word += " or (" + order(type, (num+3), first, second);
            four_word += " or (" + order(type, (num+4), first, second);
            five_word += " or (" + order(type, (num+5), first, second);
         } else if (num == 1){
            first_word += " and " + order(type, 2, first, second) + ") ";
            second_word += " and " + order(type, (num+2), first, second) + ") ";
            third_word += " and " + order(type, (num+3), first, second) + ") ";
            four_word += " and " + order(type, (num+4), first, second) + ") ";
            five_word += " and " + order(type, (num+5), first, second) + ") ";
         } else {
            first_word += " and " + order(type, (num+1), first, second) + "";
            second_word += " and " + order(type, (num+2), first, second) + " ";
            third_word += " and " + order(type, (num+3), first, second) + " ";
            four_word += " and " + order(type, (num+4), first, second) + " ";
            five_word += " and " + order(type, (num+5), first, second) + " ";
         }
      } 
   }


   for (var i = 0; i < word.length; i++) {

      var choseong = getConstantVowel(word[i]).f
      var jungseong = getConstantVowel(word[i]).s
      var jongseong = getConstantVowel(word[i]).t;
   
      if (word[i] === 'ㄱ' || choseong === "ㄱ" || word[i] === 'ㄳ') {
         checkString(word.length, i, '가', '낗')
      } else if (word[i] === "ㄴ" || choseong === "ㄴ" || word[i] === 'ㄵ' || word[i] === "ㄶ" ) {
         checkString(word.length, i, '나', '닣')
      } else if (word[i] === "ㄷ" || choseong === "ㄷ") {
         checkString(word.length, i, '다', '띻')
      } else if (word[i] === "ㄹ" || choseong === "ㄹ" || word[i] === "ㄺ" || word[i] === "ㄻ" || word[i] === "ㄼ" || word[i] === "ㄽ" || word[i] === "ㄾ" || word[i] === "ㄿ" || word[i] === "ㅀ") {
         checkString(word.length, i, '라', '맇')
      } else if (word[i] === "ㅁ" || choseong === "ㅁ") {
         checkString(word.length, i, '마', '밓')
      } else if (word[i] === "ㅂ" || choseong === "ㅂ" || word[i] === "ㅄ") {
         checkString(word.length, i, '바', '삫')
      } else if (word[i] === "ㅅ" || choseong === "ㅅ" || word[i] === "ㅆ") {
         checkString(word.length, i, '사', '앃')
      } else if (word[i] === "ㅇ" || choseong === "ㅇ") {
         checkString(word.length, i, '아', '잏')
      } else if (word[i] === "ㅈ" || choseong === "ㅈ") {
         checkString(word.length, i, '자', '찧')
      } else if (word[i] === "ㅊ" || choseong === "ㅊ") {
         checkString(word.length, i, '차', '칳')
      } else if (word[i] === "ㅋ" || choseong === "ㅋ") {
         checkString(word.length, i, '카', '킿')
      } else if (word[i] === "ㅌ" || choseong === "ㅌ") {
         checkString(word.length, i, '타', '팋')
      } else if (word[i] === "ㅍ" || choseong === "ㅍ") {
         checkString(word.length, i, '파', '핗')
      } else if (word[i] === "ㅎ" || choseong === "ㅎ") {
         checkString(word.length, i, '하', '힣')
      } else if (word[i] == ' ' || choseong == ' '){
         checkString(word.length, i, ' ', ' ')
      } else if (word[i] == '0' || word[i] == '1' || word[i] == '2' || word[i] == '3' || word[i] == '4' ||
                word[i] == '5' || word[i] == '6' || word[i] == '7' || word[i] == '8' || word[i] == '9' ){
         checkString(word.length, i, ' ', ' ')
      }else if (word[i] == jungseong || word[i] == 'ㅏ'  || word[i] == 'ㅐ'  || word[i] == 'ㅑ'  || word[i] == 'ㅒ'  || word[i] == 'ㅓ'
      || word[i] == 'ㅔ'  || word[i] == 'ㅕ'  || word[i] == 'ㅖ'  || word[i] == 'ㅗ'  || word[i] == 'ㅘ' || word[i] == 'ㅚ' || word[i] == 'ㅛ' 
      || word[i] == 'ㅜ' || word[i] == 'ㅝ' || word[i] == 'ㅞ' || word[i] == 'ㅟ' || word[i] == 'ㅠ' || word[i] == 'ㅡ' || word[i] == 'ㅢ' || word[i] == 'ㅣ')  {
         checkString(word.length, i, jungseong, sumHangul(choseong, jungseong, 'ㅎ'))
      }
   }
   // 쿼리에 빈칸 이유 = 글자 수가 충족되지 못해 \n만 들어감
   sql += first_word + "\n" + second_word + "\n" + third_word + "\n" + four_word + "\n" + five_word + "\n" + six_word + "\n" + seven_word + "\n" + eight_word;
   
   return sql;

}

var f = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ',
   'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ',
   'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
var s = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ',
   'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ',
   'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];
var t = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ',
   'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ',
   'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ',
   'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

function sumHangul(cho, jung, jong) {
   var cho_num, jung_num, jong_num;
   var i;

   for (i = 0; i < f.length; i++) {
      if (f[i] == cho) {
         cho_num = i;
         break;
      }
   }
   for (i = 0; i < s.length; i++) {
      if (s[i] == jung) {
         jung_num = i;
         break;
      }
   }
   if (!jong) {
      jong_num = 0;
   }
   else {
      for (i = 0; i < t.length; i++) {
         if (t[i] == jong) {
            jong_num = i;
            break;
         }
      }
   }

   var result = (cho_num * 21 * 28) + (jung_num * 28) + jong_num + 0xAC00;



   if (result > 44031 && result < 55204)
      return String.fromCharCode(result); // '초성이 'ㄱ,ㄴ~ㅎ' 까지인 경우
   else
      return "";                                      // '초성이 'ㅠ '1 등 잘 못된 경우
}


function getConstantVowel(kor) {

   var ga = 44032;
   var uni = kor.charCodeAt(0);

   uni = uni - ga;

   var fn = parseInt(uni / 588);
   var sn = parseInt((uni - (fn * 588)) / 28);
   var tn = parseInt(uni % 28);

   return {
      f: f[fn],
      s: s[sn],
      t: t[tn]
   };
}