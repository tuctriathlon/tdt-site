import { HttpClient } from '@angular/common/http'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { DataService } from 'src/app/shared/services/data.service'

describe('DataService', () => {
  let service: DataService

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                HttpClient,
            ]
        })
        service = TestBed.inject(DataService)
    })

    test('should be created', () => {
        expect(service).toBeTruthy()
    })
})
