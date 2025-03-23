const companyLogos = [
    { name: "Airbnb", width: 84, height: 35, src: "https://a.slack-edge.com/a4c4a15/marketing/img/homepage/true-prospects/revamp-exp/logos/logo-airbnb-small.png", srcSet: "https://a.slack-edge.com/a4c4a15/marketing/img/homepage/true-prospects/revamp-exp/logos/logo-airbnb-small.png 1x, https://a.slack-edge.com/a4c4a15/marketing/img/homepage/true-prospects/revamp-exp/logos/logo-airbnb-small@2x.png 2x" },
    { name: "NASA", width: 51, height: 35, src: "https://a.slack-edge.com/a4c4a15/marketing/img/homepage/true-prospects/revamp-exp/logos/logo-nasa-small.png", srcSet: "https://a.slack-edge.com/a4c4a15/marketing/img/homepage/true-prospects/revamp-exp/logos/logo-nasa-small.png 1x, https://a.slack-edge.com/a4c4a15/marketing/img/homepage/true-prospects/revamp-exp/logos/logo-nasa-small@2x.png 2x" },
    { name: "Uber", width: 54, height: 35, src: "https://a.slack-edge.com/a4c4a15/marketing/img/homepage/true-prospects/revamp-exp/logos/logo-uber-small.png", srcSet: "https://a.slack-edge.com/9df734f/marketing/img/homepage/true-prospects/revamp-exp/logos/logo-uber-small@2x.png 2x" },
    { name: "Target", width: 38, height: 35, src: "https://a.slack-edge.com/a4c4a15/marketing/img/homepage/true-prospects/revamp-exp/logos/logo-target-small.png", srcSet: "https://a.slack-edge.com/a4c4a15/marketing/img/homepage/true-prospects/revamp-exp/logos/logo-target-small@2x.png 2x" },
    { name: "New York Times", width: 178, height: 35, src: "https://a.slack-edge.com/a4c4a15/marketing/img/homepage/true-prospects/revamp-exp/logos/logo-nyt-small.png", srcSet: "https://a.slack-edge.com/a4c4a15/marketing/img/homepage/true-prospects/revamp-exp/logos/logo-nyt-small@2x.png 2x" },
    { name: "Etsy", width: 58, height: 35, src: "https://a.slack-edge.com/a4c4a15/marketing/img/homepage/true-prospects/revamp-exp/logos/logo-etsy-small.png", srcSet: "https://a.slack-edge.com/a4c4a15/marketing/img/homepage/true-prospects/revamp-exp/logos/logo-etsy-small@2x.png 2x" }
  ];
  
  const LogoBar = () => {
    return (
      <div className="w-full flex justify-center">
        <ul className="flex flex-wrap justify-center items-center gap-8 md:gap-20 lg:gap-28">
          {companyLogos.map((logo, index) => (
            <li key={index} className="flex justify-center">
              <img
                alt={logo.name}
                width={logo.width}
                height={logo.height}
                loading="lazy"
                className="lazyload max-w-[100px] md:max-w-[140px] lg:max-w-[180px]"
                src={logo.src}
                srcSet={logo.srcSet}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default LogoBar;
  