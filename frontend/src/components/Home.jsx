import React, { useState, useEffect, useRef } from 'react';
import { getCourses } from '../services/courseService';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import * as pdfjsLib from 'pdfjs-dist';
import 'pdfjs-dist/web/pdf_viewer.css'; // Optional, for styling

const AppBody = () => {
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(''); // State to manage the URL of the PDF file
  const [isAtBottom, setIsAtBottom] = useState(false); // State to track scroll position
  const pdfContainerRef = useRef(null); // Reference to the PDF container
  const [filename, setfilename] = useState('');

  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url
  ).toString();
  
  
  useEffect(() => {
    fetchCourses(); // Fetch courses on component mount
  }, []);

  useEffect(() => {
    // Only render PDF if the modal is shown and the ref is defined
    if (showModal && pdfContainerRef.current) {
      console.log('Rendering PDF:', pdfUrl); // Log the URL before rendering
      renderPDF(pdfUrl);
    }
  }, [showModal, pdfUrl]);

  const fetchCourses = async () => {
    try {
      const data = await getCourses();
      setCourses(data);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    }
  };

  const handleShow = (fileName, courseName) => {
    // Construct the PDF URL and set the state
    setPdfUrl(`/pdfs/${fileName}`);
    setShowModal(true);
    setfilename(courseName);
  };

  const handleClose = () => {
    setShowModal(false);
    // Clear the PDF URL to reset for next use
    setPdfUrl('');
    setIsAtBottom(false); // Reset scroll position state
  };

  const renderPDF = async (url) => {
    const pdfContainer = pdfContainerRef.current;
    if (!pdfContainer) return; // Safety check

    pdfContainer.innerHTML = ''; // Clear previous content

    try {
      const pdf = await pdfjsLib.getDocument(url).promise;
      const numPages = pdf.numPages;

      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const viewport = page.getViewport({ scale: 1.5 }); // Adjust scale as needed

        // Create a canvas for the page
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Set the max dimensions for the canvas
        canvas.style.maxWidth = '100%'; // Fit to the container's width
        canvas.style.height = 'auto'; // Maintain aspect ratio

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        await page.render(renderContext).promise; // Render the page onto the canvas
        pdfContainer.appendChild(canvas); // Append the canvas to the container
      }
    } catch (error) {
      console.error("Error rendering PDF:", error);
    }
  };

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = pdfContainerRef.current;
    setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 5); // Adjust threshold as necessary
  };

  return (
    <Container fluid style={{ padding: '2rem', backgroundColor: '#f8f9fa' }}>
      <Row>
        {courses.length > 0 ? (
          courses.map((course) => (
            <Col md={4} className="mx-auto" key={course.id}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>{course.course_name}</Card.Title>
                  <Card.Text>
                    This is some content that could go in the sidebar. You can put links,
                    additional information, or call-to-action buttons here.
                  </Card.Text>
                  <Button
                    variant="secondary"
                    onClick={() => handleShow(course.pdf_name, course.course_name)} // Pass the file name
                  >
                    Get Started
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col md={12} className="text-center">
            <p>Loading courses...</p>
          </Col>
        )}
      </Row>

      {/* Modal Component to Show PDF */}
      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{filename}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Scrollable container for PDF */}
          <div
            ref={pdfContainerRef}
            className="pdf-container" // Add the class for styling
            onScroll={handleScroll} // Attach scroll event listener
            style={{ height: '70vh', overflowY: 'auto' }} // Ensure the style is applied directly
          />
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center w-100">
          <Button
            variant="secondary"
            onClick={handleClose}
            disabled={!isAtBottom} // Disable the button until scrolled to bottom
          >
            ACKNOWLEDGE
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AppBody;
