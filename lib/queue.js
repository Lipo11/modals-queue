'use strict';

function generateID()
{
	return (new Date()).getTime() * 100 + Math.floor( Math.random() * 100 );
}

const Queue = module.exports = class Queue
{
    static s_modals = [];
	static s_active_modal_id = null;
	static s_active_flow_id = null;

    static showModal( show, flow_id = undefined )
	{
		if( !Queue.s_active_modal_id )
		{
			Queue.s_active_flow_id = flow_id;
			show( Queue.s_active_modal_id = generateID() );
		}
		else
		{
			Queue.s_modals.push({ show, flow_id });
		}
	}

	static onModalClosed( id )
	{
		if( id === Queue.s_active_modal_id )
		{
			let next_modal = Queue.s_modals.shift();

			if( next_modal )
			{
				Queue.s_active_modal_id = generateID();
				Queue.s_active_flow_id = next_modal.flow_id;
				
				setTimeout(() => next_modal.show( Queue.s_active_modal_id ), 100);
			}
			else
			{
				Queue.s_active_modal_id = null;
				Queue.s_active_flow_id = null;
			}
		}
		else
		{
			console.log('Invalid modal id');
		}
	}

	static cancelModals( flow_id = null )
	{
		if( !flow_id || ( flow_id && Queue.s_active_flow_id == flow_id ) )
		{
			Queue.onModalClosed( Queue.s_active_modal_id );
		}

		for( let i = 0; i < Queue.s_modals.length; ++i )
		{
			if( flow_id === null || Queue.s_modals[i].flow_id === flow_id )
			{
				Queue.s_modals.splice( i--, 1 );
			}
		}
    }
};