import { Button, Container, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addEvent } from '../services/api'
import {eventSchema} from "../services/EventSchema"
import { zodResolver } from '@hookform/resolvers/zod'
import useEventStore from '../ZustandStores/useEventStore'

function AddEvent() {


    const navigate = useNavigate()
    const {addEventObject}= useEventStore();
    const {register ,handleSubmit ,formState: { errors } } = useForm({
      resolver: zodResolver(eventSchema),
    });
   





    const submit = async (data) => {

    const   {name, description, price, nbTickets , img}= data
   
      const object = {
        name:name,
        description:description,
        price:price,
        img:img[0].name,
        nbTickets:nbTickets,
        nbParticipants: 0,
        like: false
      }
    const result  = await addEvent(object)
    addEventObject(result.data)
    if (result.status == 201){

        navigate('/events')
    }



    
  };

    
  return (

    <Container className='mt-5'>

        <h1>Add Event</h1>
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
        <Form.Control type="number" placeholder="Enter number of tickets" {...register('nbTickets' , {setValueAs :(value)=> Number(value)})} />
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

export default AddEvent