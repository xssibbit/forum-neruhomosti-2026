(() => {
  const apply = () => {
    document.querySelectorAll('#tickets .ticket-card:not(.contact-card) a.button').forEach(button => {
      button.innerHTML = 'Купити квиток <span>↗</span>';
      button.setAttribute('aria-label', 'Купити квиток');
    });

    if (!document.querySelector('#ticket-date-adjustments-style')) {
      const style = document.createElement('style');
      style.id = 'ticket-date-adjustments-style';
      style.textContent = `
        html body .hero .eyebrow{
          min-width:min(100%,530px)!important;
          padding:15px 20px!important;
          gap:18px!important;
        }
        html body .hero .eyebrow::before{
          font-size:clamp(48px,4.5vw,66px)!important;
        }
        html body .hero .eyebrow::after{
          font-size:clamp(16px,1.3vw,20px)!important;
        }
        @media(max-width:760px){
          html body .hero .eyebrow{
            padding:12px 13px!important;
            gap:10px!important;
          }
          html body .hero .eyebrow::before{
            font-size:clamp(36px,9.8vw,45px)!important;
          }
          html body .hero .eyebrow::after{
            font-size:clamp(13px,3.4vw,15px)!important;
            padding-left:10px!important;
          }
        }
        @media(max-width:360px){
          html body .hero .eyebrow::before{font-size:32px!important}
          html body .hero .eyebrow::after{font-size:12px!important}
        }
      `;
      document.head.append(style);
    }
  };

  apply();
  requestAnimationFrame(apply);
})();
