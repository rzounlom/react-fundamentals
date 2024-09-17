import { FC, ReactNode } from "react";

interface SectionProps {
  name: string;
  children: ReactNode;
}

const Section: FC<SectionProps> = ({ name, children }) => {
  return (
    <section id={name} style={styles.section}>
      {children}
    </section>
  );
};

// styles for the component
const styles = {
  section: {
    minHeight: "75vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderBottom: "3px solid #ddd",
  },
};

export default Section;
