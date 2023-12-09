import React, { useEffect, useState } from 'react';
import { getMentor, getClassrooms, getLessonModuleActivities } from '../../../Utils/requests';
import { message, Tag } from 'antd';
import './AllLessons.less';
import { useNavigate } from 'react-router-dom';


const SCIENCE = 1;
const MAKING = 2;
const COMPUTATION = 3;



const AllLessons = () => {

  const navigate = useNavigate();

  const goBack = () => {
    navigate('/Dashboard'); 
  };
  
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllActivities = async () => {
      setLoading(true);
      try {
        const mentorRes = await getMentor();
        if (mentorRes.data && mentorRes.data.classrooms) {
          const classroomIds = mentorRes.data.classrooms.map(c => c.id);
          const classroomsDetails = await getClassrooms(classroomIds);

          let allActivities = [];
          for (const classroom of classroomsDetails) {
            const lessonModuleIds = classroom.selections.map(selection => selection.lesson_module);
              for (const moduleId of lessonModuleIds) {
              const lessonModuleActivities = await getLessonModuleActivities(moduleId) 
              allActivities.push(...lessonModuleActivities.data);
            }
            
          }
          // Remove any potential duplicate activities by ID
          const uniqueActivities = Array.from(new Map(allActivities.map(act => [act['id'], act])).values());
          setActivities(uniqueActivities);
        } else {
          throw new Error(mentorRes.err || 'Mentor data is not available');
        }
      } catch (err) {
        message.error('Failed to fetch activities: ' + err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllActivities();
  }, []);

  const renderTags = (learningComponents, type) => {
    if (!learningComponents) return null; // Handle cases where learningComponents might be undefined

    return learningComponents
      .filter(component => component.learning_component_type === type)
      .map((component, index) => (
        <Tag key={index} color="blue">{component.type}</Tag> // Assuming 'type' is the correct property
      ));
  };
  

  return (
    <div className="all-lessons-page">
      <div className="navbar">
        <button type="button" onClick={goBack} className="back-button">
          Back to Classrooms
        </button>
      </div>
      <div className="all-activities-container">
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        <div className="activity-card-container">
          {activities.map(activity => (
            <div key={activity.id} className="activity-card">
              <div className="activity-header">
                Activity Level {activity.number}
              </div>
              <div className="activity-body">
                <p><strong>STANDARDS:</strong> {activity.StandardS}</p>
                <p><strong>Description:</strong> {activity.description}</p>
                <div className="tags-container">
                  <p><strong>Science Components:</strong> {renderTags(activity.learning_components, SCIENCE)}</p>
                  <p><strong>Making Components:</strong> {renderTags(activity.learning_components, MAKING)}</p>
                  <p><strong>Computation Components:</strong> {renderTags(activity.learning_components, COMPUTATION)}</p>
                </div>
                {activity.link && (
                  <p>
                    <strong>Link to Additional Information:</strong>
                    <a href={activity.link} target="_blank" rel="noopener noreferrer">
                      {activity.link}
                    </a>
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllLessons;
