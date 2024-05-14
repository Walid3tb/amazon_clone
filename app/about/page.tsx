type Props = {};

const About = (props: Props) => {
  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <h1 className="text-4xl text-center my-10 font-bold">About Us</h1>
      <h2 className="text-2xl font-semibold mb-4">Welcome to <span className="font-bold">WESELT!</span></h2>
      <h3>
        This project aims to solve an issue that all school students and their
        guardians face everyday, which is traffic and time consuming when trying
        to pick up their kids from school. This project will make it easier for
        guardians to pick up their kids from school by applying a way of
        communication between the students school and their guardians
        through this website called WESELT. Guardians can send a notification to
        the school that is being heading to. The notification will have all the
        details that concern the students that are to be picked up and also a
        map to show the distance and time needed for guardians to arrive.
      </h3>
    </div>
  );
};

export default About;
