const cardElements = document.querySelectorAll('.tips__stage__card');

// クリックイベントリスナーを追加
cardElements.forEach(function(cardElement) {
  cardElement.addEventListener('click', function() {
    // クリックされたカードが "open" クラスを持っているか確認
    if (cardElement.classList.contains('open')) {
      // "open" クラスを削除
      cardElement.classList.remove('open');
    } else {
      // すべてのカードから "open" クラスを削除
      cardElements.forEach(function(card) {
        card.classList.remove('open');
      });
      // クリックされたカードに "open" クラスを追加
      cardElement.classList.add('open');
    }
  });
});