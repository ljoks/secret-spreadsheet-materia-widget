import React from 'react'
import Cell from './creator-cell'
import renderer from 'react-test-renderer'
import { shallow } from '../enzyme'

describe('CreatorCell component', function() {

  beforeEach(() => {
		jest.resetModules()
	})

  test('CreatorCell calls appendColumn', () => {
		const props = {
			appendColumn: jest.fn(),
		}
		const component = shallow(<Cell {... props}/>)
		component.find('.cell').simulate('keyDown', {altKey: true, key: 'PageUp'})
		expect(props.appendColumn).toBeCalled()
	})

	test('CreatorCell calls removeColumn', () => {
		const props = {
			removeColumn: jest.fn(),
		}
		const component = shallow(<Cell {... props}/>)
		component.find('.cell').simulate('keyDown', {altKey: true, key: 'PageDown'})
		expect(props.removeColumn).toBeCalled()
	})

	test('CreatorCell calls appendRow', () => {
		const props = {
			appendRow: jest.fn(),
		}
		const component = shallow(<Cell {... props}/>)
		component.find('.cell').simulate('keyDown', {shiftKey: true, key: 'PageUp'})
		expect(props.appendRow).toBeCalled()
	})

	test('CreatorCell calls removeRow', () => {
		const props = {
			removeRow: jest.fn(),
		}
		const component = shallow(<Cell {... props}/>)
		component.find('.cell').simulate('keyDown', {shiftKey: true, key: 'PageDown'})
		expect(props.removeRow).toBeCalled()
	})

	test('CreatorCell calls focusOnCell to cell above', () => {
		const props = {
			focusOnCell: jest.fn(),
		}
		const component = shallow(<Cell {... props}/>)
		component.find('.cell').simulate('keyDown', {ctrlKey: true, key: 'ArrowUp'} )
		expect(props.focusOnCell).toReturnTimes(1)
		component.find('.cell').simulate('keyDown', {metaKey: true, key: 'ArrowUp'} )
		expect(props.focusOnCell).toReturnTimes(2)
	})

	test('CreatorCell calls focusOnCell to cell below', () => {
		const props = {
			focusOnCell: jest.fn(),
		}
		const component = shallow(<Cell {... props}/>)
		component.find('.cell').simulate('keyDown', {ctrlKey: true, key: 'ArrowDown'} )
		expect(props.focusOnCell).toReturnTimes(1)
		component.find('.cell').simulate('keyDown', {metaKey: true, key: 'ArrowDown'} )
		expect(props.focusOnCell).toReturnTimes(2)
	})

	test('CreatorCell calls focusOnCell to cell on the left', () => {
		const props = {
			focusOnCell: jest.fn(),
		}
		const component = shallow(<Cell {... props}/>)
		component.find('.cell').simulate('keyDown', {ctrlKey: true, key: 'ArrowLeft'} )
		expect(props.focusOnCell).toReturnTimes(1)
		component.find('.cell').simulate('keyDown', {metaKey: true, key: 'ArrowLeft'} )
		expect(props.focusOnCell).toReturnTimes(2)
	})

	test('CreatorCell calls focusOnCell to cell on the right', () => {
		const props = {
			focusOnCell: jest.fn(),
		}
		const component = shallow(<Cell {... props}/>)
		component.find('.cell').simulate('keyDown', {ctrlKey: true, key: 'ArrowRight'} )
		expect(props.focusOnCell).toReturnTimes(1)
		component.find('.cell').simulate('keyDown', {metaKey: true, key: 'ArrowRight'} )
		expect(props.focusOnCell).toReturnTimes(2)
	})

	test('CreatorCell not calling focusOnCell', () => {
		const props = {
			focusOnCell: jest.fn(),
		}
		const component = shallow(<Cell {... props}/>)
		component.find('.cell').simulate('keyDown', {shiftKey: true, key: 'ArrowRight'} )
		expect(props.focusOnCell).toReturnTimes(0)

	})

	test('CreatorCell renders basic cell', () => {
		const props={
			data: {
				options: {
					blank: true,
				},
				questions: [{
					text: '',
				}],
			},
			refsArray: [[]],
			row: 0,
			column: 0,
		}
		const tree = renderer.create(<Cell {... props}/>).toJSON()
		expect(tree).toMatchSnapshot()
	})

	test('CreatorCell calls checkbox onClick', () => {
		const props={
			data: {
				options: {
					blank: true,
				},
				questions: [{
					text: '',
				}],
			},
			refsArray: [[]],
			row: 0,
			column: 0,
		}
		const component = shallow(<Cell {... props}/>)
		component.find('.checkbox').simulate('Click')
		expect(props.data.options.blank).toBeFalsy()
	})

	test('CreatorCell calls checkbox onKeyDown', () => {
		const props={
			data: {
				options: {
					blank: true,
				},
				questions: [{
					text: '',
				}],
			},
			refsArray: [[]],
			row: 0,
			column: 0,
		}
		const component = shallow(<Cell {... props}/>)
		component.find({type: 'checkbox'}).simulate('keyDown', {key: 'Enter'})
		expect(props.data.options.blank).toBeFalsy()
	})

	test('CreatorCell calls checkbox onChange which does nothing', () => {
		const props={
			data: {
				options: {
					blank: true,
				},
				questions: [{
					text: '',
				}],
			},
			refsArray: [[]],
			row: 0,
			column: 0,
		}
		const component = shallow(<Cell {... props}/>)
		component.find({type: 'checkbox'}).simulate('change', {target: {checked: false}})
		expect(props.data.options.blank).toBeTruthy()
	})

	test('CreatorCell does not call checkbox onKeyDown with wrong key', () => {
		const props={
			data: {
				options: {
					blank: true,
				},
				questions: [{
					text: '',
				}],
			},
			refsArray: [[]],
			row: 0,
			column: 0,
		}
		const component = shallow(<Cell {... props}/>)
		component.find({type: 'checkbox'}).simulate('keyDown', {shiftKey: true})
		expect(props.data.options.blank).toBeTruthy()
	})

	test('CreatorCell tests text field input', () => {
		const props={
			data: {
				options: {
					blank: true,
				},
				questions: [{
					text: '',
				}],
			},
			refsArray: [[]],
			row: 0,
			column: 0,
		}
		const component = shallow(<Cell {... props}/>)
		component.find({type: 'text'}).simulate('change', {target: {value: 'Test'}});
		expect(props.data.questions[0].text).toEqual('Test')
	})
})
