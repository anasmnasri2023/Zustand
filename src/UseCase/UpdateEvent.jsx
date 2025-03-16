import React, { useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom'
import { editEvent, getallEvents } from '../services/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { eventSchema } from '../services/EventSchema';
import useEventStore from '../ZustandStores/useEventStore';

function UpdateEvent() {
    const { updateEventObject} = useEventStore();
    const {id}= useParams();

   const navigate = useNavigate()

    const [eventItem, setEventItem]= useState({
        name:"",
        description:"",
        img:"",
        price:0,
        nbTickets:0,
        nbParticipants:0,
        like: false
    })

    const { register, handleSubmit, reset,formState: { errors } } = useForm({
        resolver: zodResolver(eventSchema), defaultValues: eventItem,
    });
    useEffect(() => {
      reset(eventItem); 
  }, [eventItem, reset]);
    useEffect(() => {
        const fetchEvent = async () => {
            const event = await getallEvents(id);
            console.log(event.data);
            setEventItem(event.data);
            reset(event.data, { keepErrors: true, keepDirty: true});
        };
    
        fetchEvent();
    }, [id, reset]); //
  


    
        const submit = async (data) => {
          
        const   {name, description, price, nbTickets , img}= data
        console.log(data)
        console.log(errors)
       
        const result  = await editEvent(id, {
          name:name,
          description:description,
          price:price,
          img: img[0].name,
          nbTickets:nbTickets,
          nbParticipants: eventItem.nbParticipants,
          like: eventItem.like,
        })
    
        updateEventObject(result.data)
        if (result.status == 200){
    
            navigate('/events')
        }
    
    
    
        
      };
    
  return (
    
 
    <Container className='mt-5'>

        <h1>Update  Event with id :{id}       ,{eventItem.name}
         </h1>
    <Form onSubmit={handleSubmit(submit)}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name </Form.Label>
        <Form.Control type="text" placeholder="Enter name" {...register('name')}/>
        {errors.name && <p>{errors.name.message}</p>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Description </Form.Label>
        <Form.Control type="text" placeholder="Enter description" {...register('description')} />
        {errors.description && <p>{errors.description.message}</p>}
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Image </Form.Label>
        <Form.Control type="file" placeholder="Enter image" {...register('img')} />
        {errors.img && <p>{errors.img.message}</p>}
      </Form.Group>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Number of tickets </Form.Label>
        <Form.Control type="number" placeholder="Enter number of tickets" {...register('nbTickets', {setValueAs :(value)=> Number(value)})} />
        {errors.nbTickets && <p>{errors.nbTickets.message}</p>}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>price </Form.Label>
        <Form.Control type="number" placeholder="Enter number" {...register('price', {setValueAs :(value)=> Number(value)})}  />
        {errors.price && <p>{errors.price.message}</p>}
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </Container>

  )
}

export default UpdateEvent;