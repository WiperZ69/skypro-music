import { formatTime, getTimePanel } from './formatTime'

describe('formatTime', () => {
	it('Форматирование секунд для минут и секунд', () => {
		expect(formatTime(65)).toBe('1:05')
		expect(formatTime(125)).toBe('2:05')
	})

	it('Форматирование секунд для двузначных минут', () => {
		expect(formatTime(600)).toBe('10:00')
		expect(formatTime(1234)).toBe('20:34')
	})

	it('обработка нуля в секундах', () => {
		expect(formatTime(0)).toBe('0:00')
	})

	it('Обработка секунд менее одной минуты', () => {
		expect(formatTime(30)).toBe('0:30')
		expect(formatTime(5)).toBe('0:05')
	})

	it('Обработка больших значений времени', () => {
		expect(formatTime(3600)).toBe('60:00')
		expect(formatTime(3661)).toBe('61:01')
	})

	it('Обработка отрицательных чисел, оборачиваем их как ноль', () => {
		expect(formatTime(-5)).toBe('0:00')
		expect(formatTime(-100)).toBe('0:00')
	})
})

describe('getTimePanel', () => {
	it('Возвращает отформатированную панель времени, если указано totalTime', () => {
		expect(getTimePanel(65, 180)).toBe('1:05 / 3:00')
		expect(getTimePanel(0, 120)).toBe('0:00 / 2:00')
		expect(getTimePanel(360, 360)).toBe('6:00 / 6:00')
	})

	it('Должен возвращать undefined, если totalTime не определен', () => {
		expect(getTimePanel(65, undefined)).toBeUndefined()
		expect(getTimePanel(0, undefined)).toBeUndefined()
	})

	it('Должен возвращать undefined, если totalTime равен null', () => {
		expect(getTimePanel(65, null)).toBeUndefined()
	})

	it('Обработка крайних случаев, когда currentTime больше totalTime', () => {
		expect(getTimePanel(300, 180)).toBe('5:00 / 3:00')
	})
})
