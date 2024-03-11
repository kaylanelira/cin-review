import { render, screen } from '@testing-library/react';
import CourseInfo from './CourseInfo';

describe('CourseInfo component', () => {
  const courseData = {
    code: 'CS101',
    name: 'Introduction to Computer Science',
    department: 'Computer Science',
    semester: 1,
    professor: 'Dr. John Doe',
    description: 'This course provides an introduction to computer science concepts.',
  };

  it('renders basic course information correctly', () => {
    render(<CourseInfo course={courseData} />);
    
    // Check if basic course information is rendered correctly
    expect(screen.getByText(courseData.name)).toBeInTheDocument();
    expect(screen.getByText(`Departamento: ${courseData.department}`)).toBeInTheDocument();
    expect(screen.getByText(`Semestre: ${courseData.semester}`)).toBeInTheDocument();
    expect(screen.getByText(`Professor: ${courseData.professor}`)).toBeInTheDocument();
  });

});
