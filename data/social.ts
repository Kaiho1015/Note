export type Social = {
  github?: string;
  twitter?: string;
  juejin?: string;
  qq?: string;
  wx?: string;
  cloudmusic?: string;
  zhihu?: string;
  email?: string;
  discord?: string;
  telegram?: string;
};

type SocialValue = {
  href?: string;
  title: string;
  icon: string;
  color: string;
};

const social: Social = {
  github: "https://github.com/QHP1015",
  // twitter: 'https://twitter.com/kuizuo',
  // juejin: 'https://juejin.cn/user/1565318510545901',
  // qq: 'https://img.kuizuo.cn/qq.png',
  wx: "https://kaiho.cc/wp-content/uploads/2024/02/weixin3.jpg",
  // zhihu: 'https://www.zhihu.com/people/kuizuo',
  // cloudmusic: 'https://music.163.com/#/user/home?id=1333010742',
  email: "mailto:pastqian@outlook.com",
  discord: "https://discord.com/invite/XqMMEaQnP8",
  telegram: "https://t.me/kaiho1",
};

const socialSet: Record<keyof Social | "rss", SocialValue> = {
    github: {
        href: social.github,
        title: "GitHub",
        icon: "ri:github-line",
        color: "#010409",
    },
    //   juejin: {
    //     href: social.juejin,
    //     title: "掘金",
    //     icon: "simple-icons:juejin",
    //     color: "#1E81FF",
    //   },
    //   twitter: {
    //     href: social.twitter,
    //     title: "Twitter",
    //     icon: "ri:twitter-line",
    //     color: "#1da1f2",
    //   },
    discord: {
        href: social.discord,
        title: "Discord",
        icon: "ri:discord-line",
        color: "#5A65F6",
    },
    //   qq: {
    //     href: social.qq,
    //     title: "QQ",
    //     icon: "ri:qq-line",
    //     color: "#1296db",
    //   },
    wx: {
        href: social.wx,
        title: "微信",
        icon: "ri:wechat-2-line",
        color: "#07c160",
    },
    //   zhihu: {
    //     href: social.zhihu,
    //     title: "知乎",
    //     icon: "ri:zhihu-line",
    //     color: "#1772F6",
    //   },
    email: {
        href: social.email,
        title: "邮箱",
        icon: "ri:mail-line",
        color: "#D44638",
    },
    //   cloudmusic: {
    //     href: social.cloudmusic,
    //     title: "网易云",
    //     icon: "ri:netease-cloud-music-line",
    //     color: "#C20C0C",
    //   },
    //   rss: {
    //     href: "/blog/rss.xml",
    //     title: "RSS",
    //     icon: "ri:rss-line",
    //     color: "#FFA501",
    //   },
    telegram: {
        href: social.telegram,
        title: "Telegram",
        icon: "iconoir:telegram",
        color: "#52a5e2",
    },
    twitter: {
        href: "",
        title: "",
        icon: "",
        color: ""
    },
    juejin: {
        href: "",
        title: "",
        icon: "",
        color: ""
    },
    qq: {
        href: "",
        title: "",
        icon: "",
        color: ""
    },
    cloudmusic: {
        href: "",
        title: "",
        icon: "",
        color: ""
    },
    zhihu: {
        href: "",
        title: "",
        icon: "",
        color: ""
    },
    rss: {
        href: "",
        title: "",
        icon: "",
        color: ""
    }
};

export default socialSet;
