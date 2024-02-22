import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";
import { relative } from "path";
import SocialLinks from "../SocialLinks";

type FeatureItem = {
  title: string;
  Svg?: React.ComponentType<React.ComponentProps<"svg">>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Easy to Use",
    description: (
      <>
        Give me a star at{" "}
        <a target='_blank' rel='noopener noreferrer' href='https://github.com/QHP1015' style={{position:"relative"}}>
        <i className="header-github-link" style={{position:"absolute",left:"0.6rem"}}></i>
        </a>

      </>
    ),
  },
  {
    title: "Learn More About Me",
    description: (
      <>
        To my{" "}
        <a target='_blank' rel='noopener noreferrer' href='https://qianhaipeng.com'>
          blog
        </a>
        <br />
        To my other{" "}
        <a target='_blank' rel='noopener noreferrer' href='https://kaiho.cc'>
          website
        </a>
      </>
    ),
  },
  {
    title: "Contact Me",
    description: (
      <>
       <SocialLinks/>
      </>
    ),
  },
];

function Feature({ title, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      {/* <div className='text--center'>
      </div> */}
      <div className='text--center padding-horiz--md'>
        <Heading as='h3'>{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className='container'>
        <div className='row'>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
