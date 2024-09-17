import { FC } from "react";
import Section from "./Section";
import { sections } from "../../data/sections";

const SectionList: FC = () => {
  return (
    <>
      {sections.map(({ id, component: Component }) => (
        <Section key={id} name={id}>
          <Component name={""} />
        </Section>
      ))}
    </>
  );
};

export default SectionList;
